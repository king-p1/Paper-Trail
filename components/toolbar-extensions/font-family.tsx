import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
 import { ChevronDown } from 'lucide-react'
 import { cn } from '@/lib/utils'
 import { useEditorStore } from '@/store/use-editor-store'
 import React from 'react'
 
 export const FontFamilyButton = () => {
   
    
            const { editor} = useEditorStore()
        
        const fonts = [
        {
            label:"Arial",value:"Arial"
        }
        ,{
            label:"Times New Roman",value:"Times New Roman"
        }
        ,{
            label:"Courier New",value:"Courier New"
        }
        ,{
            label:"Georgia",value:"Georgia"
        }
        ,{
            label:"Verdana",value:"Verdana"
        }
        ,{
            label:"Inter",value:"Inter"
        }
        ,{
            label:"Monospace",value:"monospace"
        }
        ,{
            label:"Cursive",value:"cursive"
        }
        ,{
            label:"Comic Sans MS",value:"Comic Sans MS"
        }
        ,{
            label:"Kanit",value:"Kanit"
        }
        ]
    
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <button
        className={cn('h-7  text-sm flex justify-between items-center w-[120px] px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
        >
    
            <span className="truncate">
            {editor?.getAttributes("texStyle").fontFamily || 'Inter' }
            </span>
    <ChevronDown className='ml-2 size-4 shrink-0'/>
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        {fonts.map(({label,value})=>(
            <button key={value}
            className={cn("flex items-center w-full gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            editor?.getAttributes("texStyle").fontFamily === value && 'bg-neutral-200/80'
            )}
            onClick={()=>editor?.chain().focus().setFontFamily(value).run()}
            style={{
            fontFamily:value
            }}
            >
            <span className="text-sm">
            {label}
            </span>
            </button>
        ))}
        </DropdownMenuContent>
    </DropdownMenu>
    
    )
 }
 
  
  
  