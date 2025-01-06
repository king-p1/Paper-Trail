"use client";

import { useEffect, useState } from "react";
import { BsCloudCheck } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { cn } from "@/lib/utils";
import { NavProps } from "@/types";
import { debounce } from "lodash";

export const DocumentInput = ({ trailData }: NavProps) => {
  const updateTrail = useMutation(api.document.updatePaperTailById);
  const { _id: id } = trailData;
  
  // Subscribe to real-time updates of the document
  const currentTrail = useQuery(api.document.getPaperTrailById, { 
    id 
  });
  
  const user = useQuery(api.document.UserByConvex);
  const isAdmin = user?.organization_id && user?.organization_role === "org:admin";
  const isPersonalTrail = user?.organization_id === null || user?.organization_id === "null";

  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState<string>(currentTrail?.title ?? "");
  const [lastSavedTitle, setLastSavedTitle] = useState<string>(currentTrail?.title ?? "");

  // Update local state when the document updates from the server
  useEffect(() => {
    if (currentTrail?.title && !isUpdating) {
      setTitle(currentTrail.title);
      setLastSavedTitle(currentTrail.title);
    }
  }, [currentTrail?.title]);

  const debouncedUpdate = debounce(async (newTitle: string) => {
    if (!isAdmin) return;
    
    try {
      setIsUpdating(true);
      await updateTrail({
        id,
        title: newTitle.trim() || 'Untitled'
      });
      setLastSavedTitle(newTitle);
    } catch (error) {
      handleError(error);
      // Revert to last saved title on error
      setTitle(lastSavedTitle);
    } finally {
      setIsUpdating(false);
    }
  }, 2000);

  useEffect(() => {
    if (title !== lastSavedTitle && isAdmin) {
      debouncedUpdate(title);
    }

    return () => {
      debouncedUpdate.cancel();
    };
  }, [title, isAdmin, lastSavedTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAdmin) return;

    try {
      setIsUpdating(true);
      await updateTrail({
        id,
        title: title.trim() || 'Untitled'
      });
      setLastSavedTitle(title);
    } catch (error) {
      handleError(error);
      setTitle(lastSavedTitle);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof ConvexError) {
      toast.error(error.message);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to rename trail');
    }
  };

  // Show loading state while initial data is being fetched
  if (!currentTrail) {
    return (
      <div className="animate-pulse h-8 w-48 bg-gray-200 rounded" />
    );
  }

  return (
    <div className="relative">
      <form 
        className="flex items-center gap-2   max-w-[175px] w-fit"
        onSubmit={handleSubmit}
      >
        <input
          value={title}
          onChange={handleInputChange}
          disabled={ isUpdating || (!isAdmin && !isPersonalTrail)}
          placeholder="Enter trail title"
          className={cn(
            " max-w-[175px] w-fit border-none shadow-none focus:outline-none text-lg bg-transparent truncate",
            "transition-colors duration-200",
            !isAdmin && !isPersonalTrail && "opacity-75 cursor-not-allowed",
            isUpdating && "opacity-50"
          )}
        />
        
        <span className="flex-shrink-0">
          {isUpdating ? (
            <RxUpdate className="size-5 animate-spin text-blue-500" />
          ) : (
            <BsCloudCheck 
              className={cn(
                "size-5",
                title === lastSavedTitle ? "text-green-500" : "text-gray-400"
              )} 
            />
          )}
        </span>
      </form>
    </div>
  );
};