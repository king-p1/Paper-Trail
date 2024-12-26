import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {   AlignCenterIcon, AlignLeftIcon,AlignRightIcon,AlignJustifyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

export const TextAlignBtn = () => {
  const { editor } = useEditorStore();


  const alignments = [
    {
        label:"Align Left",value:"left",icon:AlignLeftIcon
    },
    {
        label:"Align Center",value:"center",icon:AlignCenterIcon
    },
    {
        label:"Align Right",value:"right",icon:AlignRightIcon
    },
    {
        label:"Align justify",value:"justify",icon:AlignJustifyIcon
    },
    
     
    ] 

 

  return <DropdownMenu>
  <DropdownMenuTrigger asChild> 
  <button
  className={cn('h-7  text-sm flex flex-col  justify-center items-center min-w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
  >
      <AlignLeftIcon className="size-4"/>
       
  </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
   {alignments.map(({icon:Icon,label,value})=>(
    <button key={value}
    onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
    className={cn("w-full flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80",
        editor?.isActive({textAlign:value}) && 'bg-neutral-200/80'
    )}
    >
<Icon/>
<span className="text-sm">{label}</span>
    </button>
   ))}
  </DropdownMenuContent>
</DropdownMenu>
};
