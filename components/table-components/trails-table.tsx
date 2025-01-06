import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrailTableProps } from "@/types";
import { TbLoader3 } from "react-icons/tb";
import { TrailRow } from "./trail-row";
import { Button } from "../ui/button";

export const TrailTable = ({ trails, loadMore, status }: TrailTableProps) => {
  if (trails === undefined) {
    return (
      <div className="h-[95vh] w-full flex items-center justify-center">
        <TbLoader3 size={56} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto w-full px-16 flex flex-col gap-5 py-6">
      <Table>
        <TableCaption>Recent Trails.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="">Name</TableHead>
            <TableHead>&nbsp;</TableHead>
            <TableHead className="hidden md:table-cell">Shared</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
          </TableRow>
        </TableHeader>
        {trails.length === 0 ? (
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell
                className="h-24 text-center text-muted-foreground font-semibold"
                colSpan={4}
              >
                No Trails Found.
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {trails.map((trail) => (
              <TrailRow key={trail._id} trail={trail} />
            ))}
          </TableBody>
        )}
      </Table>
      <div className="flex items-center justify-center">
        <Button 
        disabled={status !== "CanLoadMore"}
        onClick={()=>loadMore(5)}
        size='sm'
        >
{status === 'CanLoadMore' ? 'Load more' : 'All trails have been loaded'}
        </Button>
      </div>
    </div>
  );
};
