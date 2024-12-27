"use client";
import React from "react";
import { BsCloudCheck } from "react-icons/bs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ConvexError } from "convex/values";
import { RxUpdate } from "react-icons/rx";
import { ChartNoAxesCombinedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const DocumentInput = () => {
  const [renaming, setRenaming] = useState(false);
  // const [title, setTitle] = useState<string>(initialTitle);
  const [title, setTitle] = useState<string>("");

  // const onRenameTrail = async(e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setRenaming(true);

  //   try {
  //     await updateTail({
  //       id: trailId,
  //       title: title.trim() || 'Untitled'
  //     });
  //     toast.success(`Trail renamed to "${title.trim() || 'Untitled'}"`)
  //     setOpen(false);
  //   } catch (error) {
  //     if (error instanceof ConvexError) {
  //       // Handle specific Convex errors
  //       toast.error(error.message)
  //     } else if (error instanceof Error) {
  //       // Handle other types of errors
  //       toast.error(error.message)
  //     } else {
  //       // Fallback error message
  //       toast.error('Failed to rename trail')
  //     }
  //   } finally {
  //     setRenaming(false)
  //   }
  // };

  return (
    <div className="flex items-center gap-2">
      <form
      // onSubmit={onRenameTrail}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={renaming}
          placeholder="Enter trail title"
          className={cn("border-none", renaming && "border")}
        />

        <span className="text-lg px-1.5 cursor-pointer truncate">
          Untitled Trail
        </span>
        <Button variant="ghost" disabled={renaming}>
          {renaming ? (
            <RxUpdate className="size-5 animate-spin" />
          ) : (
            <BsCloudCheck className="size-5" />
          )}
        </Button>
      </form>
    </div>
  );
};
