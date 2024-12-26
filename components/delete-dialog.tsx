"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { DeleteDialogProps } from "@/types"
import { removePaperTailById } from "@/convex/document";
import { api } from "@/convex/_generated/api";
import { mutation } from "@/convex/_generated/server";

  
  export const DeleteDialog = ({children,trailId}:DeleteDialogProps) => {
    return (
        <AlertDialog>
  <AlertDialogTrigger asChild>
    {children}
  </AlertDialogTrigger>
  <AlertDialogContent onClick={(e)=>e.stopPropagation()}>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Trail Document
        and from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )
  }
  