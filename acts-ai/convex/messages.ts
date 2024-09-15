import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel"; // Import the Id type

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("author"), identity.email))
      .collect();
  },
});

export const sendMessage = mutation({
  args: {
    author: v.string(),
    body: v.string(),
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", args);
  },
});
