// RenameDialog.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RenameDialogProps } from "@/types";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ConvexError } from "convex/values";

export const RenameDialog = ({ children, trailId, initialTitle }: RenameDialogProps) => {
  const updateTail = useMutation(api.document.updatePaperTailById);
  const [open, setOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState<string>(initialTitle);

  const onRenameTrail = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setRenaming(true);
    
    try {
      await updateTail({ 
        id: trailId, 
        title: title.trim() || 'Untitled' 
      });
      toast.success(`Trail renamed to "${title.trim() || 'Untitled'}"`)
      setOpen(false);
    } catch (error) {
      if (error instanceof ConvexError) {
        // Handle specific Convex errors
        toast.error(error.message)
      } else if (error instanceof Error) {
        // Handle other types of errors
        toast.error(error.message)
      } else {
        // Fallback error message
        toast.error('Failed to rename trail')
      }
    } finally {
      setRenaming(false)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename Trail</DialogTitle>
          <DialogDescription>
            Enter a new title for your trail
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onRenameTrail}>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              disabled={renaming}
              placeholder="Enter trail title"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false)
              }}
              disabled={renaming}
              type="button"
              variant='ghost'
            >
              Cancel
            </Button>

            <Button
              disabled={title.trim().length === 0 || renaming}
              type="submit"
            >
              {renaming ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};