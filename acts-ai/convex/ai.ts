import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const chat = action({
  args: {
    roomID: v.id("rooms"),
    messages: v.array(v.string())
  },
  handler: async (ctx, args) => {
    // Convert context to a query parameter string (URL encoding is required for safe transmission)
    const context = encodeURIComponent(args.messages.toString());

    // Construct the URL with the query parameters
    const url = `https://devanshusp--example-hello-world-respond-to-chat.modal.run?context=${context}`;

    // Send the GET request
    const res = await fetch(url, {
      method: "GET",
    });
    // Parse the JSON response
    // const json = await res.json();
    const string = await res.text()

    // Pull the message content out of the response
    const messageContent = string || "Sorry, I don't have an answer for that.";
    console.log(messageContent)

    // Send AI's response as a new message
    await ctx.runMutation(api.messages.sendMessage, {
      author: "AI Agent",
      body: messageContent,
      roomId: args.roomID,
    });
  },
});

interface Message {
    roomId: Id<"rooms">;
    body: string;
    author: string;
    _id: Id<"messages">; // Assuming each message has an ID
    _creationTime: number; // Assuming each message has a creation timestamp
}

import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Query to fetch all messages for rooms where the user is a patient
export const getMessagesForPatient = query({
  args: {
    userID: v.string(), // Pass the user ID as an argument
  },
  handler: async (ctx, { userID }) => {
    // Step 1: Fetch all rooms where the user is a patient
    const rooms = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("patient"), userID))
      .collect();

    if (rooms.length === 0) {
      return []; // Return empty array if no rooms are found
    }

    // Step 2: Fetch all messages for each room
    let allMessages: Message[] = [];
    for (const room of rooms) {
      const messages = await ctx.db
        .query("messages")
        .filter((q) => q.eq(q.field("roomId"), room._id)) // Filter by each room ID
        .order("desc")
        .collect();

      allMessages = allMessages.concat(messages); // Combine messages from all rooms
    }

    return allMessages.reverse(); // Reverse to show messages in chronological order
  },
});


