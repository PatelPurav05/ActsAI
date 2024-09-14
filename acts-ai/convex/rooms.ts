import { mutation, query } from "./_generated/server";

// Fetch all rooms
export const getRooms = query(async ({ db }) => {
  return await db.query("rooms").collect();
});

// Create a new room
export const createRoom = mutation(async ({ db }, { roomName, patient, therapist }: { roomName: string, patient: string, therapist: string}) => {
  const room = {
    name: roomName,
    patient: patient,
    therapist: therapist
  };
  await db.insert("rooms", room);
});
