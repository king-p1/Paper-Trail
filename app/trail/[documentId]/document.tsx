"use client"
import React from 'react'
import { Editor } from './tools/editor'
import { Toolbar } from './tools/toolbar'
import { Navbar } from '@/components/navigations/navbar'
import { Room } from './room'
import { TrailProps } from '@/types'
import { usePreloadedQuery } from 'convex/react'

 

export const Trail =  ({preloadedTrail}:TrailProps) => {
 
  const trail = usePreloadedQuery(preloadedTrail)

  return (
        <Room>
    <div className='min-h-screen '>
      <div className="flex print:hidden flex-col pt-1 fixed top-0 right-0 left-0 z-10 bg-[#f8f8fa] gap-y-2">

      <Navbar trailData={trail}/>
        <Toolbar/>
      </div>

      <div className="pt-[130px] print:pt-0">
    <Editor initialContent={trail.initialContent}/>
      </div>
    </div>
        </Room>
  )
}
