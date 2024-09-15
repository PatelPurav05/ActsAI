import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { Id } from "../convex/_generated/dataModel";
import { api } from "../convex/_generated/api";
import ChatRoom from "./ChatRoom";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useStoreUserEffect } from "./useStoreUserEffect";
import Navbar from "./Navbar";

function Chats() {
  
  const rooms = useQuery(api.rooms.getRoomsForCurrUser); // Fetch rooms
  const [selectedRoom, setSelectedRoom] = useState<Id<"rooms"> | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);


  const createRoom = useMutation(api.rooms.createRoom); // UseMutation for the createRoom mutation
  const user = useQuery(api.users.getUser);
  const [roomName, setRoomName] = useState("TestRoom");
  const [patient, setPatient] = useState("Purav Patel");
  const [therapist, setTherapist] = useState("Therapist 1");

  // Handler for creating a room
  const handleCreateRoom = async () => {
    if (roomName && patient && therapist) {
      try {
        // Call mutation and pass the required arguments
        await createRoom({ roomName, patient, therapist, notes: []});
        alert("Room created successfully");
      } catch (error) {
        console.error("Error creating room:", error);
      }
    } else {
      alert("Please fill in all fields");
    }
  };
  // Set the first room as the default selected room
  useEffect(() => {
    if (rooms && rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]._id);
      setSelectedTherapist(rooms[0].therapist)
      setSelectedPatient(rooms[0].patient)
    }
  }, [rooms, selectedRoom]);
  const { isLoading, isAuthenticated } = useStoreUserEffect();

  return (
    <div><Navbar />
    <div className=" w-100 mx-10">
    
    {isAuthenticated ?
    <Flex height="100vh" bg="white">
      {/* Left Side: Room Selection */}
      <VStack
        w="250px"
        h="150px"
        bg="white"
        p={4}
        mt={6}
        spacing={6}
        shadow="lg"
        align="start"
      >
        <Text alignSelf="center" fontSize="xl" fontWeight="bold" color="black">
          {user?.userType === "patient" ? "THERAPISTS" :  "PATIENTS"}
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue" w="full">
            {(user?.userType === "patient" ? (selectedTherapist ? `${selectedTherapist}` : "Select a Therapist") : (selectedPatient ? `${selectedPatient}`: "Select a Patient"))}
          </MenuButton>
          <MenuList bg="gray.600">
            {rooms?.map((room) => (
              <MenuItem
                key={room._id}
                onClick={() => {setSelectedRoom(room._id); setSelectedPatient(room.patient); setSelectedTherapist(room.therapist)}}
                bg="gray.300"
                _hover={{ bg: "blue.500", color: "white" }}
              >
                {user?.userType === "patient"? room.therapist: room.patient}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {/* <Button onClick={handleCreateRoom}>
            Create Chat
          </Button> */}
      </VStack>

      {/* Right Side: Chat Room */}
      <Flex flexGrow={1} p={6} direction="column">
        {selectedRoom ? (
             <ChatRoom roomId={selectedRoom} />

        ) : (
          <Text mt={4} textAlign="center" fontSize="xl" color="gray.300">
            Please select a room to start chatting.
          </Text>
        )}
      </Flex>
    </Flex>
 : <></>}
    </div>
    </div>
  );
}

export default Chats;