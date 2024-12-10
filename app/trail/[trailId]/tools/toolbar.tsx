"use client"
import { FontFamilyButton } from '@/components/toolbar-extensions/font-family'
import { HeadingLevelBtn } from '@/components/toolbar-extensions/heading-level'
import { HighlightColorBtn } from '@/components/toolbar-extensions/highligh-color'
import { LinkBtn } from '@/components/toolbar-extensions/link'
import { TextColorBtn } from '@/components/toolbar-extensions/text-color'
import { Separator } from '@/components/ui/separator'
import { useSections } from '@/constants'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { ToolbarButtonProps } from '@/types'
import React from 'react'



const ToolbarButton = ({icon:Icon,isActive,onClick}:ToolbarButtonProps) => {
return(
  <button
  onClick={onClick}
  className={cn('text-sm h-7 min-w-7 flex items-center justify-center hover:bg-neutral-300/80 rounded-sm', isActive && 'bg-neutral-300/80')}
  >
<Icon className='size-4'/>
  </button>
)
}

export const Toolbar = () => {
  const sections = useSections()
  const { editor} = useEditorStore()

console.log('toolbar editor',{editor})
  return (
    <div className='px-2.5 bg-[#F1F4F9] dark:bg-[#212324] py-0.5  overflow-x-auto flex items-center min-h-[40px] gap-x-0.5'>
      {sections[0].map((item)=>(
        <ToolbarButton {...item} key={item.label}/>
      ))}
      <Separator orientation='vertical' className='h-5 w-[1.3px]  bg-neutral-600'/>
      <FontFamilyButton/>
      <Separator orientation='vertical' className='h-5 w-[1.3px]  bg-neutral-600'/>
      <HeadingLevelBtn/>
      <Separator orientation='vertical' className='h-5 w-[1.8px]  bg-neutral-600'/>
<TextColorBtn/> 
<HighlightColorBtn /> 
      {sections[2].map((item)=>(
        <ToolbarButton {...item} key={item.label}/>
      ))}
      <LinkBtn/>
      <Separator orientation='vertical' className='h-5 w-[1.6px]  bg-neutral-600'/>
      {sections[1].map((item)=>(
        <ToolbarButton {...item} key={item.label}/>
      ))}
      <Separator orientation='vertical' className='h-5 w-[2.3px]  bg-neutral-600'/>
      </div>
  )
}
