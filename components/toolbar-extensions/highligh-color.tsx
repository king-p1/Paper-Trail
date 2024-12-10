import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {   HighlighterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, TwitterPicker } from "react-color";

export const HighlightColorBtn = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000000";

  const onChange = (color: ColorResult) => {
editor?.chain().focus().setHighlight({color: color.hex}).run()
  };

  return <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <button
  className={cn('h-7  text-sm flex flex-col  justify-center items-center min-w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
  >
      <HighlighterIcon className="size-4"/>
      <div className="w-full h-1" style={{
        backgroundColor:value
      }}/>
  </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="p-0">
   <TwitterPicker
   triangle="hide"
   color={value}
   onChange={onChange}
   />
  </DropdownMenuContent>
</DropdownMenu>
};
