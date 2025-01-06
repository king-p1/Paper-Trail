// DeleteDialog.tsx
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
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { getCleanErrorMessage } from "@/lib/constants";
import { useRouter } from "next/navigation";

export const DeleteDialog = ({children, trailId}: DeleteDialogProps) => {

  const router = useRouter()

  const deleteTrail = useMutation(api.document.removePaperTailById)
  const [isDeleting, setisDeleting] = useState(false)

  const onDeleteTrail = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setisDeleting(true)
    
    try {
      await deleteTrail({id: trailId})
      toast.success('Trail deleted successfully')
      router.push('/trail')
    } catch (error) {
      console.log(error)
      if (error instanceof ConvexError) {
        const errorMessage = getCleanErrorMessage(error);
        toast.error(errorMessage);
      } else if (error instanceof Error) {
        const errorMessage = getCleanErrorMessage(error);
        toast.error(errorMessage);
      } else {
        // Fallback error message
        toast.error('Failed to delete trail')
      }
    } finally {
      setisDeleting(false)
      // router.push('/trail')
    }
  }

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
          <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={onDeleteTrail}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
