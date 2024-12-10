"use ckient"
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { FiExternalLink } from "react-icons/fi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const LinkBtn = () => {
  const { editor } = useEditorStore();

  const [value,setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href:string) => {
editor?.chain().focus().extendMarkRange("link").setLink({href}).run()
setValue("")
  };

  return <DropdownMenu
  onOpenChange={(open)=>{
    if(open) setValue(editor?.getAttributes("link").href || "")
  }}
  >
  <DropdownMenuTrigger asChild>
  <button
  className={cn('h-7  text-sm flex flex-col  justify-center items-center min-w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
  >
      <FiExternalLink className="size-4"/>
     
  </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
   <Input
   placeholder="https://your-link.com"
   value={value}
   onChange={(e)=>setValue(e.target.value)}
   />
   <Button
   onClick={()=>onChange(value)}
   >Apply</Button>
  </DropdownMenuContent>
</DropdownMenu>
};
