import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel"; // Import Id type

interface ChatRoomProps {
  roomId: Id<"rooms">;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const messages = useQuery(api.messages.getMessagesForRoom, { roomId }); // Fetch messages for the room
  const sendMessage = useMutation(api.messages.sendMessage); // Mutation to send a message
  const [newMessage, setNewMessage] = useState<string>(""); // New message input

  const handleSendMessage = async () => {
    if (newMessage) {
      await sendMessage({ roomId, body: newMessage, author: "User1" }); // Simulate a user ID
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Chat Room</h2>
      <div className="max-h-64 overflow-y-auto mb-4">
        {messages?.map((message) => (
          <div key={message._id} className="mb-2">
            <strong className="text-blue-500">{message.author}:</strong>{" "}
            <span className="text-black">{message.body}</span>
            <br />
            <small className="text-gray-500 text-sm">
              {new Date(message._creationTime).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
