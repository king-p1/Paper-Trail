import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/paper-trail-logo.png'

export const HomeNav = () => {
  return (
    <div className='flex items-center justify-between  '>
        <div className="flex gap-2 items-center  ">
            <Link href='/' className='flex items-center -ml-4'>
            <Image  src={logo}
        alt="logo"
        width='80'
        height='80'
        />

<h2 className="text-base font-semibold">PaperTrail</h2>
            </Link>
        </div>
    </div>
  )
}
