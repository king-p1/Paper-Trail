import React from 'react'
import { BsCloudCheck } from 'react-icons/bs'

export const DocumentInput = () => {
  return (
    <div className='flex items-center gap-2'>
        <span
        className='text-lg px-1.5 cursor-pointer truncate'
        >
            Untitled Trail
        </span>
        <BsCloudCheck className='size-5'/>
         </div>
  )
}
