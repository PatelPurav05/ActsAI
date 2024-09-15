import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertTherapist = mutation({
    args: {
      name: v.string(),
      phone: v.string(),
      location: v.string(),
      website: v.string(),
      keywords: v.string(),
      embedding: v.array(v.float64()),
    },
    handler: async (ctx, args) => {
      const { name, phone, location, website, keywords, embedding } = args;
      return await ctx.db.insert("therapists", {
        name,
        phone,
        location,
        website,
        keywords,
        embedding,
      });
    },
  });