import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {   AlignCenterIcon, AlignLeftIcon,AlignRightIcon,AlignJustifyIcon, ListIcon, ListOrderedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

export const ListBtn = () => {
  const { editor } = useEditorStore();


  const lists = [
    {
        label:"Bullet List",
        isActive:()=>editor?.isActive("bulletList"),
        icon:ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
        label:"Ordered List",
        isActive:()=>editor?.isActive("orderedList"),
        icon:ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run()
    },
    ] 

 

  return <DropdownMenu>
  <DropdownMenuTrigger asChild> 
  <button
  className={cn('h-7  text-sm flex flex-col  justify-center items-center min-w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
  >
      <ListIcon className="size-4"/>
       
  </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
   {lists.map(({icon:Icon,label,onClick,isActive})=>(
    <button key={label}
    onClick={onClick}
    className={cn("w-full flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80",
        isActive() && 'bg-neutral-200/80'
    )}
    >
<Icon/>
<span className="text-sm">{label}</span>
    </button>
   ))}
  </DropdownMenuContent>
</DropdownMenu>
};
