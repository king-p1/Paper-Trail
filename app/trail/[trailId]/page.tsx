import React from 'react'
import { Editor } from './tools/editor'
import { Toolbar } from './tools/toolbar'
import { ModeToggle } from '@/themes/theme-toggler'

interface TrailIdPageProps {
    params :Promise<{trailId : string}>
}

const TrailIdPage = async({params}:TrailIdPageProps) => {
    const awaitedTrail = await params

const {trailId} = awaitedTrail

  return (
    <div className='min-h-screen '>
      <ModeToggle/>
        <Toolbar/>
    <Editor/>
    </div>
  )
}

export default TrailIdPage