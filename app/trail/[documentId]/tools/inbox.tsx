"use client"

// import { InboxProps } from "@/types";
import { ClientSideSuspense   } from "@liveblocks/react";
import { InboxNotification,InboxNotificationList } from "@liveblocks/react-ui";
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { TbLoader3 } from "react-icons/tb";

export const UserInbox = () => {
  return (
    <ClientSideSuspense fallback={ 
        <div className="flex items-center justify-center gap-2">
            <TbLoader3 className="size-4 animate-spin"/>
            <Separator orientation="vertical" className="h-6"/>
        </div>
    }>
        <InboxMenu/>
    </ClientSideSuspense>
  )
}


const InboxMenu = ()=>{
const { inboxNotifications } = useInboxNotifications()
 
 return(
<>
<DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="rounded-full relative border-none" variant="ghost">
            <BellIcon className="size-5"/> 
            {inboxNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs flex items-center justify-center">
                    {inboxNotifications.length}
                </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuItem
            className="flex items-center gap-2"
          >
             {inboxNotifications.length > 0 ? (
                <InboxNotificationList >
                    {inboxNotifications.map((inboxNotification)=>(
                        <InboxNotification inboxNotification={inboxNotification} key={inboxNotification.id}/>
                    ))}
                </InboxNotificationList>
            ) : (
                <div className="font-medium text-lg p-2 text-center w-[400px] text-muted-foreground">
                        No notifications available
                </div>
            )}
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6"/>
      </>
    )
}

 