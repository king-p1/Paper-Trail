"use server"

import { auth,clerkClient } from "@clerk/nextjs/server"
import { generateUserColor } from "./constants"
import { ConvexHttpClient } from "convex/browser"
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export const getUsers = async() => {
    const {sessionClaims} = await auth()

    const clerk = await clerkClient()

    const response = await clerk.users.getUserList({
        organizationId:[sessionClaims?.org_id as string]
    })

    const users = response.data.map((user)=>({
        id:user.id,
        name:user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        color:generateUserColor(),
        avatar:user.imageUrl,
        role:sessionClaims?.org_role as string
    }))


return users

}

export const getTrails = async(ids:Id<"documents">[]) => {
    return await convex.query(api.document.getPaperTrailsByIds,{ids})
}
