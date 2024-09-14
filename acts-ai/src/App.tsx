import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { Id } from "../convex/_generated/dataModel"; // Import Id type
import { api } from "../convex/_generated/api";
import ChatRoom from "./ChatRoom";

function App() {
  const rooms = useQuery(api.rooms.getRooms); // Fetch rooms
  const createRoom = useMutation(api.rooms.createRoom); // Mutation to create a room
  const [newRoomName, setNewRoomName] = useState<string>(""); // New room input
  const [selectedRoom, setSelectedRoom] = useState<Id<"rooms"> | null>(null); // Selected room ID with proper type

  const handleCreateRoom = async () => {
    if (newRoomName) {
      await createRoom({ roomName: newRoomName });
      setNewRoomName("");
    }
  };

  return (
    <div className=" w-screen min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-black">Chat Rooms</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <ul className="mb-4">
          {rooms?.map((room) => (
            <li
              key={room._id}
              onClick={() => setSelectedRoom(room._id)}
              className={`cursor-pointer p-2 rounded-md mb-2 text-lg ${
                selectedRoom === room._id ? "bg-blue-500 text-black" : "bg-gray-200 text-black"
              } hover:bg-blue-400 hover:text-black transition-all`}
            >
              {room.name}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="New room name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleCreateRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Create
          </button>
        </div>
      </div>

      {selectedRoom && (
        <div className="w-full max-w-md mt-8">
          <ChatRoom roomId={selectedRoom} />
        </div>
      )}
    </div>
  );
}

export default App;
