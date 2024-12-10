import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { ChevronDown } from 'lucide-react'
  import { cn } from '@/lib/utils'
  import { useEditorStore } from '@/store/use-editor-store'
import { Level } from '@tiptap/extension-heading'

  export const HeadingLevelBtn = () => {
    const { editor} = useEditorStore()

    const headings = [
        {
            label:"Basic Text",value:0,fontSize:"16px"
        },
        {
            label:"Heading 1",value:1,fontSize:"40px"
        },
        {
            label:"Heading 2",value:2,fontSize:"36px"
        },
        {
            label:"Heading 3",value:3,fontSize:"28px"
        },
        {
            label:"Heading 4",value:4,fontSize:"24px"
        },
        {
            label:"Heading 5",value:5,fontSize:"18px"
        },
        {
            label:"Heading 6",value:6,fontSize:"16px"
        },
         
        ]

const getCurrentHeading =()=>{
    for(let level =1; level <= 5; level++){
        if(editor?.isActive("heading", {level})){
            return `Heading ${level}`
        }
    }

    return "Basic Text"
}

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <button
        className={cn('h-7  text-sm flex justify-center items-center min-w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
        >
    
            <span className="truncate">
            {getCurrentHeading()}
            </span>
    <ChevronDown className='ml-2 size-4 shrink-0'/>
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        {headings.map(({label,value,fontSize})=>(
            <button key={value}
            className={cn("flex items-center w-full gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading  ",{level: value}) && 'bg-neutral-200/80'
            )}
            onClick={()=>{
                if(value ===0){
                    editor?.chain().focus().setParagraph().run()
                }else{
                    editor?.chain().focus().toggleHeading({level:value as Level}).run()
                }
            }}
            style={{
                fontSize:fontSize
            }}
            >
            {label}
            </button>
        ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
