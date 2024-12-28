"use client"
const AVATAR_SIZE = 36;

import { Separator } from "@/components/ui/separator";
import { AvatarProps } from "@/types";
import { ClientSideSuspense  } from "@liveblocks/react";
import {  useOthers,useSelf } from "@liveblocks/react/suspense";



export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
        <AvatarStack/>
    </ClientSideSuspense>
  )
}


const AvatarStack = ()=>{
const users = useOthers()
const currentUser = useSelf()

if(users.length === 0) return null
return(
<>
<div className="flex items-center">
    {currentUser && (
        <div className="ml-2 relative">
            <Avatar src={currentUser.info.avatar} name="You"/>
        </div>
    )}

    <div className="flex">
        {users.map(({connectionId,info})=>(
            <Avatar key={connectionId} name={info.name} src={info.avatar}/>
        ))}
    </div>
</div>
<Separator orientation="vertical" className="h-6"/>
</>
    )
}

const Avatar = ({ name, src }: AvatarProps) => {
  return (
    <div
      className="flex group -ml-2 shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
    >
      <div className="z-10 opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white mt-2.5 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>

      <img src={src} alt={name} className="size-full rounded-full" />
    </div>
  );
};
