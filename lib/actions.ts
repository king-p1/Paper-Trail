"use server"

import { auth,clerkClient } from "@clerk/nextjs/server"
import { generateUserColor } from "./constants"

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