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

  // Handle room creation
  const handleCreateRoom = async () => {
    if (newRoomName) {
      await createRoom({ roomName: newRoomName });
      setNewRoomName("");
    }
  };

  return (
    <div className="App">
      <h1>Chat Rooms</h1>
      <div>
        {rooms?.map((room) => (
          <div key={room._id} onClick={() => setSelectedRoom(room._id)}>
            {room.name}
          </div>
        ))}
      </div>

      <input
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        placeholder="New room name"
      />
      <button onClick={handleCreateRoom}>Create Room</button>

      {selectedRoom && <ChatRoom roomId={selectedRoom} />}
    </div>
  );
}

export default App;
