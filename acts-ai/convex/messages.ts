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



// Fetch messages for a specific room, sorted by _creationTime
export const list = query(async ({ db }, { roomId }: { roomId: string }) => {
  return await db.query("messages")
    .filter(q => q.eq("roomId", roomId))
    .order("desc")
    .collect();
});
export const getMessagesForRoom = query({
    args: {roomId: v.string() },
    handler: async (ctx, {roomId}) => {
      // Grab the most recent messages.
      const messages = await ctx.db.query("messages").filter((q) => q.eq(q.field("roomId"), roomId)).
      order("desc").take(100);
      // Reverse the list so that it's in a chronological order.
      return messages.reverse();
    },
  });

// Send a new message to a room
export const sendMessage = mutation(async ({ db }, { roomId, body, author }: { roomId: Id<"rooms">, body: string, author: string }) => {
    const message = {
      roomId,
      body,
      author,
    };
    await db.insert("messages", message);
  });
