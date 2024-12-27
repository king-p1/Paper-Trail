import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";


export const getPaperTrails = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("User is unauthorized");


    const organizationId = (user.organization_id ?? undefined) as string  | undefined

    if(search && organizationId){
      return await ctx.db
      .query("documents")
      .withSearchIndex("search_title", (q) =>
        q.search("title", search).eq("organizationId", organizationId)
      )
      .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db 
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

if(organizationId){
 return await ctx.db
      .query("documents")
      .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
      .paginate(paginationOpts);
}

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const getPaperTrailById = query({
  args:{id:v.id("documents")},
  handler: async (ctx,{id}) => {
    const trail = await ctx.db.get(id)
    if (!trail) throw new ConvexError("Trail not found");

    return trail
  },
}) 

export const createPaperTail = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("User is unauthorized");

    const organizationId = (user.organization_id ?? undefined) as string  | undefined

    const isOrganizationAdmin = (user.organization_role ?? undefined) as string  | undefined

    if(organizationId) {
      if(isOrganizationAdmin !== 'org:admin') throw new ConvexError("User is unauthorized.")
    }
   

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Trail",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const removePaperTailById = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("User is unauthorized");


    const trail = await ctx.db.get(args.id);
    if (!trail) throw new ConvexError("Trail not found");

    const isOwner = trail.ownerId === user.subject;
    if (!isOwner) throw new ConvexError("User is unauthorized");
 
    const organizationId = (user.organization_id ?? undefined) as string  | undefined
    const isOrganizationAdmin = (user.organization_role ?? undefined) as string  | undefined
    if(organizationId) {
      if(isOrganizationAdmin !== 'org:admin') throw new ConvexError("User is unauthorized.")
    }

    return await ctx.db.delete(args.id);
  },
});

export const updatePaperTailById = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("User is unauthorized");

    const trail = await ctx.db.get(args.id);
    if (!trail) throw new ConvexError("Trail not found");

    const isOwner = trail.ownerId === user.subject;
    if (!isOwner) throw new ConvexError("User is unauthorized");

    const organizationId = (user.organization_id ?? undefined) as string  | undefined
    const isOrganizationAdmin = (user.organization_role ?? undefined) as string  | undefined
    if(organizationId) {
      if(isOrganizationAdmin !== 'org:admin') throw new ConvexError("User is unauthorized.")
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});



export const UserByConvex = query({
    
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
       
      return user
   },
}); 