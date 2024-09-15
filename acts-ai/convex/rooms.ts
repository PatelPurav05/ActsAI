import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Fetch all rooms
export const getRooms = query(async ({ db }) => {
  return await db.query("rooms").collect();
});

export const getRoomsForCurrUser = query({
    args: {},
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      if (identity === null) {
        throw new Error("Not authenticated");
      }
      return await ctx.db
        .query("rooms")
        .filter((q) => q.eq(q.field("patient"), identity.name))
        .collect();
    },
  });

// Create a new room
export const createRoom = mutation(async ({ db }, { roomName, patient, therapist, notes }: { roomName: string, patient: string, therapist: string, notes: []}) => {
  const room = {
    name: roomName,
    patient: patient,
    therapist: therapist,
    notes: notes
  };
  await db.insert("rooms", room);
});

export const getRoomById = query({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, { roomId }) => {
      return await ctx.db.get(roomId);
    },
  });