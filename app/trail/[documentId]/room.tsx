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
import { getTrails, getUsers } from "@/lib/actions";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import axios from "axios";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;
        const response = await axios.post(endpoint, { room });
        return response.data;
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const trails = await getTrails(roomIds as Id<"documents">[]);
        return trails.map((trail) => ({
          id: trail.id,
          name: trail.name,
        }));
      }}
      resolveUsers={({ userIds }) => {
        return (
          userIds.map((userId) => users.find((user) => user.id === userId)) ??
          undefined
        );
      }}
    >
      <RoomProvider id={params.documentId as string}
      initialStorage={{
        leftMargin:56,
        rightMargin:56
      }}
      >
        <ClientSideSuspense
          fallback={
            <div className="h-[95vh] w-full flex items-center justify-center">
              <TbLoader3 size={56} className="animate-spin" />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
