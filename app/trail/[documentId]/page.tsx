import React from 'react'
import { Editor } from './tools/editor'
import { Toolbar } from './tools/toolbar'
import { Navbar } from '@/components/navigations/navbar'
import { Room } from './room'

interface TrailIdPageProps {
    params :Promise<{trailId : string}>
}

const TrailIdPage = async({params}:TrailIdPageProps) => {
 

  return (
    <div className='min-h-screen '>
      <div className="flex print:hidden flex-col pt-1 fixed top-0 right-0 left-0 z-10 bg-[#f8f8fa] gap-y-2">

      <Navbar/>
        <Toolbar/>
      </div>

      <div className="pt-[130px] print:pt-0">
        <Room>
    <Editor/>
        </Room>
      </div>
    </div>
  )
}

export default TrailIdPage