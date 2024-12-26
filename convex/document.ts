import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getPaperTrails = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const createPaperTail = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("User is unauthorized");

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Trail",
      ownerId: user.subject,
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

    return await ctx.db.delete(args.id);
  },
});
