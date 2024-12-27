"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { TbLoader3 } from "react-icons/tb";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams()
  return (
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}>
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