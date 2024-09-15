import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { Box, Input, Button, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook

interface ChatRoomProps {
  roomId: Id<"rooms">;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const messages = useQuery(api.messages.getMessagesForRoom, { roomId });
  const sendMessage = useMutation(api.messages.sendMessage);
  const sendAIMessage = useAction(api.ai.chat)
  const { user } = useUser(); // Fetch the current user's information using Clerk
  const currUser = useQuery(api.users.getUser);
  const getAllMessages = useQuery(api.ai.getMessagesForPatient, {userID: user?.fullName ?? ""})
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const roomData = useQuery(api.rooms.getRoomById, { roomId });
  
  const therapistName = roomData?.therapist; // Extract therapist's name or ID

  const handleSendMessage = async (userName: string) => {
    if (newMessage.trim()) {
      await sendMessage({
        roomId,
        body: newMessage,
        author: user?.fullName ?? "Anonymous", // Ensure author is always a string
    });
    if (userName === "AI Therapist"){
        let messages = await getAllMessages ?? []; //past 10 msgs
        let lastMessage = newMessage
        let allButLastMsg = messages.slice(0, -1)
        let simplifiedMessages = allButLastMsg.map((msg) => ({
            author: msg.author,
            body: msg.body,
          }));
          
          // Convert the simplified messages to a JSON string
        let stringifiedMessages = JSON.stringify(simplifiedMessages);

        await sendAIMessage({
            roomID: roomId,
            messages: stringifiedMessages,
            lastMessage: lastMessage,
            email: user?.primaryEmailAddress?.toString() ?? ""
        });
    }
      setNewMessage("");
    }
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    
    <Flex direction="column" h="100%" bgGradient="linear(to-r, teal.500, blue.500)" // Gradient background
    p={6} rounded="lg" shadow="md">
      {/* Messages Section */}
      <VStack
        spacing={4}
        overflowY="auto"
        flexGrow={1}
        bg="gray.900"
        p={4}
        rounded="lg"
      >
        
        {messages?.map((message) => (
          <Box
            key={message._id}
            as={motion.div}
            bg={message.author === (user?.fullName) ? "blue.500" : "gray.700"}
            color="white"
            p={3}
            rounded="lg"
            alignSelf={message.author === (user?.fullName) ? "flex-end" : "flex-start"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Text fontSize="sm" fontWeight="bold">
              {message.author}
            </Text>
            <Text>{message.body}</Text>
            <Text fontSize="xs" mt={1} color="gray.400">
              {new Date(message._creationTime).toLocaleTimeString()}
            </Text>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      {/* Message Input Section */}
      <HStack mt={4}>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          bg="gray.700"
          color="white"
          rounded="lg"
          focusBorderColor="blue.500"
        />
        <Button
          colorScheme="blue"
          onClick={() => {handleSendMessage(therapistName ?? "AI Therapist")}}
          rightIcon={<FiSend />}
        >
          Send
        </Button>
      </HStack>
    </Flex>

    
  );
};

export default ChatRoom;
