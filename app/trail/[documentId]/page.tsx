import { TrailIdPageProps } from "@/types";
import { Trail } from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const TrailIdPage = async ({ params }: TrailIdPageProps) => {
  const { documentId } = await params;
  const { getToken } = await auth();

  const token =  await getToken({ template: "convex" })  ?? undefined;

  if (!token) throw new Error("User is unauthorized.");
  
  const preloadedTrail = await preloadQuery(
    api.document.getPaperTrailById,
    { id: documentId },
    { token }
  );
  if (!preloadedTrail) throw new Error("Trail not found.");

  return <Trail preloadedTrail={preloadedTrail} />;
};

export default TrailIdPage;
