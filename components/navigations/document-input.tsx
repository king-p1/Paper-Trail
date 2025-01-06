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
import { TbLoader3 } from "react-icons/tb";

export const DocumentInput = ({ trailData }: NavProps) => {
  const updateTrail = useMutation(api.document.updatePaperTailById);
  const { _id: id } = trailData;
  
  const currentTrail = useQuery(api.document.getPaperTrailById, { id });
  const user = useQuery(api.document.UserByConvex);
  
  // Determine editing permissions
  const canEdit = Boolean(
    // Allow edit if user is org admin
    (user?.organization_id && user?.organization_role === "org:admin") ||
    // Or if it's a personal document (no org ID)
    (user?.organization_id === null || user?.organization_id === "null")
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState<string>(currentTrail?.title ?? "");
  const [lastSavedTitle, setLastSavedTitle] = useState<string>(currentTrail?.title ?? "");

  // Update local state when document updates from server
  useEffect(() => {
    if (currentTrail?.title && !isUpdating) {
      setTitle(currentTrail.title);
      setLastSavedTitle(currentTrail.title);
    }
  }, [currentTrail?.title]);

  const debouncedUpdate = debounce(async (newTitle: string) => {
    if (!canEdit) return;
    
    try {
      setIsUpdating(true);
      await updateTrail({
        id,
        title: newTitle.trim() || 'Untitled'
      });
      setLastSavedTitle(newTitle);
    } catch (error) {
      handleError(error);
      setTitle(lastSavedTitle);
    } finally {
      setIsUpdating(false);
    }
  }, 2000);

  useEffect(() => {
    if (title !== lastSavedTitle && canEdit) {
      debouncedUpdate(title);
    }

    return () => {
      debouncedUpdate.cancel();
    };
  }, [title, canEdit, lastSavedTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!canEdit) return;

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

  if (!currentTrail) {
    return (
      <TbLoader3 className="animate-pulse size-4" />
    );
  }
  return (
    <div className="relative">
      <form 
        className="flex items-center gap-2 max-w-[175px] w-fit"
        onSubmit={handleSubmit}
      >
        <input
          value={title}
          onChange={handleInputChange}
          disabled={isUpdating || !canEdit}
          placeholder="Enter trail title"
          className={cn(
            "max-w-[175px] w-fit border-none shadow-none focus:outline-none text-lg bg-transparent truncate",
            "transition-colors duration-200",
            !canEdit && "opacity-75 cursor-not-allowed",
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