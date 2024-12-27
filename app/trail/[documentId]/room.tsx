"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { TbLoader3 } from "react-icons/tb";
import { User } from "@/types";
import { getUsers } from "@/lib/actions";
import { toast } from "sonner";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams()

    const [users,setUsers] = useState<User[]>([])

    const fetchUsers = useMemo(()=> async()=>{
      try {
        const list = await getUsers()
        setUsers(list)
      } catch (error) {
        toast.error('Failed to fetch users')
        console.log(error)
      }
    },[])

    useEffect(()=>{
      fetchUsers()
    },[fetchUsers])

    return (
    <LiveblocksProvider 
    throttle={16}
    authEndpoint={'/api/liveblocks-auth'}
    resolveMentionSuggestions={({text})=>{
      let filteredUsers = users

      if(text){
        filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
      }
      return filteredUsers.map((user)=> user.id)
    }}
    resolveRoomsInfo={()=>[]}
    
    resolveUsers={({userIds})=>{
      return userIds.map((userId)=> users.find((user) => user.id === userId)) ?? undefined
    }}
>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div className="h-[65vh] w-full flex items-center justify-center">
        <TbLoader3 size={56} className="animate-spin" />
      </div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}