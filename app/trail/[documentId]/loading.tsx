import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

const Loading = () => {
  return (
    <div className="h-[95vh] w-full flex items-center justify-center">
              <TbLoader3 size={56} className="animate-spin" />
            </div>
  )
}

export default Loading