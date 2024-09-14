import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    patient: v.string(),
    therapist: v.string()
  }),
  messages: defineTable({
    roomId: v.id("rooms"),
    body: v.string(),
    author: v.string(),
  }),
});
