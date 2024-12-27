import { api } from "@/convex/_generated/api";
import { generateUserColor } from "@/lib/constants";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});

export const POST = async (req: Request) => {
  const { sessionClaims } = await auth();

  if (!sessionClaims) return new Response("Unauthorized", { status: 401 });

  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { room } = await req.json();

  const trail = await convex.query(api.document.getPaperTrailById, {
    id: room,
  });
  if (!trail) return new Response("Unauthorized", { status: 401 });

  const isOwner = trail.ownerId === user.id;
  const isOrgMember = !!(trail.organizationId && trail.organizationId === sessionClaims.org_id);
  const isOrgAdmin = sessionClaims.org_role;

  if (!isOwner && !isOrgMember)
    return new Response("Unauthorized", { status: 401 });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name:user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      avatar: user.imageUrl,
      role: isOrgAdmin as string,
      color: generateUserColor(),
    },
  });
  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
};
