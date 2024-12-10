import { LucideIcon } from "lucide-react"
import React from "react"
import { IconType } from "react-icons/lib"
import { type Editor } from "@tiptap/react";

export interface ToolbarButtonProps {
    onClick?:()=>void
    isActive?:boolean
    icon: LucideIcon | IconType | React.ElementType 
}

     

export interface EditorState {
    editor : Editor | null
    setEditor:(editor:Editor | null) => void
}