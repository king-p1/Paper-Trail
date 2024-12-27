import { TrailRowProps } from "@/types";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { TbPaperBag } from "react-icons/tb";
import { Building2Icon, CircleUserIcon, Router } from "lucide-react";
import { format } from "date-fns";
import { TrailDropdown } from "./trail-dropdown";
import { useRouter } from "next/navigation";

export const TrailRow = ({ trail }: TrailRowProps) => {
  const { _creationTime, _id, ownerId, title, organizationId, roomId } = trail;

  const router = useRouter()

 
  return (
    <TableRow className="cursor-pointer"
    onClick={()=>router.push(`/trail/${_id}`)}
    >
      <TableCell className="w-[12px]">
        <TbPaperBag size={25} className="text-neutral-700" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2 text-center ">
        {organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {!organizationId ? "Personal" : "Organization"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(_creationTime), "MMM dd,yyy")}
      </TableCell>
      <TableCell className="flex   justify-end">
        <TrailDropdown
        trailId={_id}
        title={title}
        onNewTab={()=>window.open(`/trail/${_id}`, "_blank")
      }
        />
      </TableCell>
    </TableRow>
  );
};
