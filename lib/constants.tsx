import { IconType } from "react-icons/lib";
import { LuUndo,LuRedo } from "react-icons/lu";
import React from 'react'
import { LucideIcon } from "lucide-react";
import { useEditorStore } from "../store/use-editor-store";
import { IoPrintOutline } from "react-icons/io5";
import { TbTextSpellcheck } from "react-icons/tb";
import { HiBold } from "react-icons/hi2";
import { PiTextItalicBold } from "react-icons/pi";
import { ImUnderline } from "react-icons/im";
import { LuStrikethrough } from "react-icons/lu";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { RiCodeBlock } from "react-icons/ri";
import { TbBlockquote } from "react-icons/tb";
import { IoCodeSlash } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { GoTasklist } from "react-icons/go";
import { FaRemoveFormat } from "react-icons/fa";

export const useSections = () => {
    const { editor } = useEditorStore();
    
    const sections: {
        label: string; 
        onClick?: () => void;
        isActive?: boolean;
        icon: LucideIcon | IconType | React.ElementType;
    }[][] = [
        [
            {
                label: 'Undo',
                icon: LuUndo,
                onClick: () => editor?.chain().focus().undo().run()
            },
            {
                label: 'Redo',
                icon: LuRedo,
                onClick: () => editor?.chain().focus().redo().run()
            },
            {
                label: 'Print',
                icon: IoPrintOutline,
                onClick: () => window.print()
            },
            {
                label: 'Spell Check',
                icon: TbTextSpellcheck,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck")
                    editor?.view.dom.setAttribute("spellcheck",current === "false" ? "true" : "false")
                }
            },
        ],[
            
            {
                label: 'Bold',
                icon: HiBold,
                isActive:editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run()
            },   
            {
                label: 'Italicize',
                icon: PiTextItalicBold,
                isActive:editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run()
            },   
            {
                label: 'Underline',
                icon: ImUnderline,
                isActive:editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run()
            },   
            {
                label: 'Strikethrough',
                icon: LuStrikethrough,
                isActive:editor?.isActive("strikethrough"),
                onClick: () => editor?.chain().focus().toggleStrike().run()
            },   
            {
                label: 'Block Quote',
                icon: TbBlockquote,
                isActive:editor?.isActive("blockqoute"),
                onClick: () => editor?.chain().focus().toggleBlockquote().run()
            },   
            {
                label: 'Code Block',
                icon: RiCodeBlock,
                isActive:editor?.isActive("codeBlock"),
                onClick: () => editor?.chain().focus().toggleCodeBlock().run()
            },   
            {
                label: 'Bulletin',
                icon: MdFormatListBulletedAdd,
                isActive:editor?.isActive("bulletList"),
                onClick: () => editor?.chain().focus().toggleBulletList().run()
            },   
            {
                label: 'Code',
                icon: IoCodeSlash,
                isActive:editor?.isActive("code"),
                onClick: () => editor?.chain().focus().toggleCode().run()
            },   
        ],[
            {
                label: 'Message',
                icon: LuMessagesSquare,
                onClick: () => editor?.chain().focus().addPendingComment().run(),
                isActive:editor?.isActive("liveblocksCommentMark"),
            },  
            {
                label: 'Task List',
                icon: GoTasklist,
                isActive:editor?.isActive("taskList"),
                onClick: () => editor?.chain().focus().toggleTaskList().run()
            },  
            {
                label: 'Remove Formatting',
                icon: FaRemoveFormat,
                onClick: () => editor?.chain().focus().unsetAllMarks().run()
            },  
        ]
    ];

    return sections;
}

export const templates = [
    {
    id:'blank',
    label:'Blank Trail',
    imageUrl:'/blank-document.svg'
},
    {
    id:'sofware-proposal',
    label:'Software proposal',
    imageUrl:'/software-proposal.svg'
},
    {
    id:'project',
    label:'Project',
    imageUrl:'/project-proposal.svg'
},
    {
    id:'cover',
    label:'Cover letter',
    imageUrl:'/cover-letter.svg'
},
    {
    id:'resume',
    label:'Resume letter',
    imageUrl:'/resume.svg'
},
    {
    id:'letter',
    label:'Letter  ',
    imageUrl:'/letter.svg'
},
]


export const getCleanErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      // Extract message between "ConvexError:" and "at handler"
      const match = error.message.match(/ConvexError: (.*?)(?= at handler|\s*$)/);
      if (match && match[1]) {
        return match[1].trim();
      }
      return error.message;
    }
    return 'An unexpected error occurred';
  };


  export  const generateUserColor = () => {
    // Predefined hues that work well for user colors
    const hues = [210, 270, 330, 30, 120, 180, 240, 300];
    
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const saturation = 80; // Fixed saturation for consistency
    const lightness = 55; // Fixed lightness for good contrast
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }; 

