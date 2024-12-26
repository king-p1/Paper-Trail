import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ExternalLinkIcon, MoreVertical, TrashIcon } from "lucide-react";
import { TrailDropdownProps } from "@/types";

import { DeleteDialog } from "../delete-dialog";

export const TrailDropdown = ({
  trailId,
  title,
  onNewTab,
}: TrailDropdownProps) => {
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

          <DeleteDialog trailId={trailId}>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              <TrashIcon className="size-4" /> Delete
            </DropdownMenuItem>
          </DeleteDialog>

          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
