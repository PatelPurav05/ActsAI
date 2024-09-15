import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const chat = action({
  args: {
    roomID: v.id("rooms"), // Validate room ID as an ID of "rooms"
    messages: v.string(), // Validate messages as an array of strings
    lastMessage: v.string(),
    email: v.string(), // Add the email field and validate it as a string
  },
  handler: async (ctx, args) => {
    // Get the last message in the array
    // Convert context (messages) to a query parameter string (URL encoding is required)    // Construct the URL with the query parameters
    const url = `https://devanshusp--example-hello-world-respond-to-chat.modal.run?context=${args.messages}&user_email=${encodeURIComponent(args.email)}&user_message=${encodeURIComponent(args.lastMessage)})}`;

    // Send the GET request
    const res = await fetch(url, {
      method: "GET",
    });

    console.log(res)

    // Parse the response (assuming text format, but change as needed)
    const messageContent = (await res.json()) || "Sorry, I don't have an answer for that.";
    console.log(messageContent);

    if (messageContent["EMERGENCY"]){
        await ctx.runMutation(api.messages.sendMessage, {
        author: "AI Agent",
        body: messageContent["EMERGENCY"] + "\n In case of any emergency, please call (111) 111-1111.",
        roomId: args.roomID,
        });
        return {msg: "EMERGENCY", content: messageContent["EMERGENCY"]}
    }
    else if (messageContent["CONVERSATION"]){
        await ctx.runMutation(api.messages.sendMessage, {
            author: "AI Agent",
            body: messageContent["CONVERSATION"],
            roomId: args.roomID,
            });
        return {msg: "OKAY", content: messageContent["CONVERSATION"]}
    }
    else if (messageContent["THERAPIST_REQUEST"]){
        await ctx.runMutation(api.messages.sendMessage, {
            author: "AI Agent",
            body: messageContent["THERAPIST_REQUEST"],
            roomId: args.roomID,
            });
        return {msg: "THERAPIST_REQUEST", content: messageContent["THERAPISTS"]}
    }
    else{
        await ctx.runMutation(api.messages.sendMessage, {
            author: "AI Agent",
            body: "Sorry, there were some technical difficulties.",
            roomId: args.roomID,
            });
        return {msg: "DIFFICULTIES", content: "technical difficulties"}
    }
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


