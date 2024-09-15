import { useState, useEffect, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ChatRoom from "./ChatRoom";
import { Id } from "../convex/_generated/dataModel";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useStoreUserEffect } from "./useStoreUserEffect";

function Chats() {
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const { isLoading: authLoading, isAuthenticated } = useStoreUserEffect();
  const rooms = useQuery(api.rooms.getRoomsForCurrUser);
  const user = useQuery(api.users.getUser);

  const [selectedRoom, setSelectedRoom] = useState<Id<"rooms"> | null>(null);

  const retry = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying... Attempt ${retryCount + 1}`);
      setRetryCount((prev) => prev + 1);
    }
  }, [retryCount]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.error("Authentication failed");
    }
    if (!authLoading && isAuthenticated && rooms === undefined) {
      retry();
    }
  }, [authLoading, isAuthenticated, rooms, retry]);

  useEffect(() => {
    if (rooms && rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]._id);
    }
  }, [rooms, selectedRoom]);

  if (authLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Text>Please log in to access the chat rooms.</Text>;
  }

  if (rooms === undefined || user === undefined) {
    if (retryCount >= MAX_RETRIES) {
      return (
        <Text>
          Failed to load data after multiple attempts. Please refresh the page.
        </Text>
      );
    }
    return <Spinner />;
  }

  if (rooms.length === 0) {
    return <Text>No chat rooms available. Please create a room first.</Text>;
  }

  return (
    <Flex height="100vh" bg="white">
      <VStack w="250px" bg="gray.100" p={4} spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Chat Rooms
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="full">
            {selectedRoom
              ? rooms.find((r) => r._id === selectedRoom)?.name
              : "Select a room"}
          </MenuButton>
          <MenuList>
            {rooms.map((room) => (
              <MenuItem
                key={room._id}
                onClick={() => setSelectedRoom(room._id)}
              >
                {room.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </VStack>
      <Flex flex={1} p={4}>
        {selectedRoom ? (
          <ChatRoom roomId={selectedRoom} />
        ) : (
          <Text>Please select a room to start chatting.</Text>
        )}
      </Flex>
    </Flex>
  );
}

export default Chats;
