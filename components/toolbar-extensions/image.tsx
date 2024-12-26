"use ckient"
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { ImageIcon, UploadCloudIcon } from "lucide-react";
import { BiPaste } from "react-icons/bi";

export const ImageBtn = () => {
  const { editor } = useEditorStore();

  const [isDialogOen,setIsDialogOen] = useState(false);
  const [imageUrl,setImageUrl] = useState("");

  const onChange = (src:string) => {
editor?.chain().focus().setImage({src}).run()
  };

  const onUpload =()=>{
    const input = document.createElement("input")

    input.type = "file"
    input.accept = "image/*"

    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]

        if(file){
            const imageUrl = URL.createObjectURL(file)
            onChange(imageUrl)
        }
    }
    input.click()
  }

const handleImageUrlSubmit=()=>{
    if(imageUrl){
        onChange(imageUrl)
        setImageUrl("")
        setIsDialogOen(false)
    }
}


  return (
  <>
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <button
  className={cn('h-7  text-sm flex flex-col  justify-center items-center min-w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
  >
      <ImageIcon className="size-4"/>
     
  </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent >

<DropdownMenuItem className="flex items-center gap-2" 
onClick={onUpload}
>
    <UploadCloudIcon className="size-4"/>
    <p className="text-sm">Upload</p>
</DropdownMenuItem>

<DropdownMenuItem className="flex items-center gap-2"
onClick={()=>setIsDialogOen(true)}
>
    <BiPaste className="size-4"/>
    <p className="text-sm">Paste image url</p>
</DropdownMenuItem>



  </DropdownMenuContent>
</DropdownMenu>



<Dialog open={isDialogOen} onOpenChange={setIsDialogOen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Insert image URL</DialogTitle>
    </DialogHeader>

<Input
value={imageUrl}
placeholder="Insert image url"
onChange={(e)=>setImageUrl(e.target.value)}
onKeyDown={(e)=>{
    if(e.key === "Enter"){
        handleImageUrlSubmit()
    }
}}
/>

<DialogFooter>
    <Button 
    onClick={handleImageUrlSubmit}
    >Insert</Button>
</DialogFooter>

  </DialogContent>
</Dialog>

</>

)
};
