import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    patient: v.string(),
    therapist: v.string(),
    notes: v.array(v.string())
  }),
  messages: defineTable({
    roomId: v.id("rooms"),
    body: v.string(),
    author: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profile: v.record(v.string(), v.string()),
    userType: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});

