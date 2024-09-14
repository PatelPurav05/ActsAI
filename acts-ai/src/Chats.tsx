import React, { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { Id } from "../convex/_generated/dataModel";
import { api } from "../convex/_generated/api";
import ChatRoom from "./ChatRoom";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function Chats() {
  const rooms = useQuery(api.rooms.getRooms); // Fetch rooms
  const [selectedRoom, setSelectedRoom] = useState<Id<"rooms"> | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  // Set the first room as the default selected room
  useEffect(() => {
    if (rooms && rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]._id);
      setSelectedTherapist(rooms[0].therapist)
    }
  }, [rooms, selectedRoom]);

  return (
    <div className="w-screen">
    <Flex height="100vh" bg="gray.900">
      {/* Left Side: Room Selection */}
      <VStack
        w="250px"
        bg="gray.800"
        p={4}
        spacing={6}
        shadow="lg"
        align="start"
      >
        <Text fontSize="xl" fontWeight="bold" color="gray.200">
          Therapists
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue" w="full">
            {selectedTherapist ? `${selectedTherapist}` : "Select a Therapist"}
          </MenuButton>
          <MenuList bg="gray.800">
            {rooms?.map((room) => (
              <MenuItem
                key={room._id}
                onClick={() => setSelectedRoom(room._id)}
                bg="gray.700"
                _hover={{ bg: "blue.500", color: "white" }}
              >
                {room.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
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
    </div>
  );
}

export default Chats;
