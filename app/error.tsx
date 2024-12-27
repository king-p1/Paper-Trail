"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import errorImg from '@/public/error-img.png'

const ErrorPage = ({error,reset}:{error:Error,reset:()=>void}) => {
     
  return (
    <div className="w-full h-[95vh] flex flex-col gap-2 justify-center items-center mt-6">

<Image
src={errorImg}
width='400'
height='400'
alt="Error page"
className="-mt-16"
loading="lazy"

/>

        <p className="font-semibold text-4xl text-red-500 ">
       {error.message}
        </p>

<div className="flex items-center gap-3">


<Button 
onClick={reset}
className="text-xl font-medium mt-2 "
variant={'secondary'}
>
Try again
</Button>

<Button asChild  className=" text-red-600 text-xl font-medium mt-2 ">
  <Link href={'/'}>Go back</Link>
</Button>

</div>
    </div>
  )
}

export default ErrorPage