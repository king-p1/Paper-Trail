import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { TrailDropdownProps } from "@/types";
import { DeleteDialog } from "../dialogs/delete-dialog";
import { RenameDialog } from "../dialogs/rename-dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
 
export const TrailDropdown =  ({
  trailId,
  title,
  onNewTab,
}: TrailDropdownProps) => {

   const user = useQuery(api.document.UserByConvex)
 

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="rounded-full" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => onNewTab(trailId)}
            className="flex items-center gap-2"
          >
            <ExternalLinkIcon className="size-4" />
            Open a new tab
          </DropdownMenuItem>


{user?.organization_id ? user?.organization_role === "org:admin" && (
    <>
     <DeleteDialog trailId={trailId}>
     <DropdownMenuItem
       className="flex items-center gap-2"
       onSelect={(e) => e.preventDefault()}
       onClick={(e) => e.stopPropagation()}
       >
       <TrashIcon className="size-4" /> Delete
     </DropdownMenuItem>
   </DeleteDialog>
   
   <RenameDialog 
   trailId={trailId} 
   initialTitle={title}
   >
     <DropdownMenuItem
       className="flex items-center gap-2"
       onSelect={(e) => e.preventDefault()}
       onClick={(e) => e.stopPropagation()}
     >
       <FilePenIcon className="size-4" /> Rename
     </DropdownMenuItem>
   </RenameDialog>
         </>) : (
    <>
     <DeleteDialog trailId={trailId}>
     <DropdownMenuItem
       className="flex items-center gap-2"
       onSelect={(e) => e.preventDefault()}
       onClick={(e) => e.stopPropagation()}
       >
       <TrashIcon className="size-4" /> Delete
     </DropdownMenuItem>
   </DeleteDialog>
   
   <RenameDialog 
   trailId={trailId} 
   initialTitle={title}
   >
     <DropdownMenuItem
       className="flex items-center gap-2"
       onSelect={(e) => e.preventDefault()}
       onClick={(e) => e.stopPropagation()}
     >
       <FilePenIcon className="size-4" /> Rename
     </DropdownMenuItem>
   </RenameDialog>
         </>
)}
          

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
