import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FiSend, FiVolume2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook

interface ChatRoomProps {
  roomId: Id<"rooms">;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const messages = useQuery(api.messages.getMessagesForRoom, { roomId });
  const sendMessage = useMutation(api.messages.sendMessage);
  const sendAIMessage = useAction(api.ai.chat);
  const { user } = useUser(); // Fetch the current user's information using Clerk
  const getAllMessages = useQuery(api.ai.getMessagesForPatient, {
    userID: user?.fullName ?? "",
  });
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const roomData = useQuery(api.rooms.getRoomById, { roomId });

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage({
        roomId,
        body: newMessage,
        author: user?.fullName ?? "Anonymous",
      });

      if (roomData?.therapist === "AI Therapist") {
        const messages = await getAllMessages;
        if (messages) {
          const simplifiedMessages = messages.map((msg) => ({
            author: msg.author,
            body: msg.body,
          }));

          const stringifiedMessages = JSON.stringify(simplifiedMessages);
          const response = await sendAIMessage({
            roomID: roomId,
            messages: stringifiedMessages,
            lastMessage: newMessage,
            email: user?.primaryEmailAddress?.emailAddress ?? "",
          });
          if (response.msg === "THERAPIST_REQUEST")
            console.log(response.content);
        }
      }
      setNewMessage("");
    }
  };

  // Text-to-speech function
  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US"; // You can set other languages as needed
    window.speechSynthesis.speak(speech);
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex direction="column" h="100%" p={6} rounded="lg" shadow="md">
      {/* Messages Section */}
      <VStack
        spacing={4}
        overflowY="auto"
        flexGrow={1}
        bg="#b4c8bd"
        p={4}
        rounded="lg"
      >
        {messages?.map((message) => (
          <Box
            key={message._id}
            as={motion.div}
            bg={message.author === user?.fullName ? "gray.300" : "gray.700"}
            color="white"
            p={3}
            rounded="lg"
            alignSelf={
              message.author === user?.fullName ? "flex-end" : "flex-start"
            }
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HStack>
              <VStack align="start">
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={message.author === user?.fullName ? "black" : "white"}
                >
                  {message.author}
                </Text>
                <Text
                  color={message.author === user?.fullName ? "black" : "white"}
                >
                  {message.body}
                </Text>
                <Text
                  fontSize="xs"
                  mt={1}
                  color={
                    message.author === user?.fullName ? "gray.700" : "gray.300"
                  }
                >
                  {new Date(message._creationTime).toLocaleTimeString()}
                </Text>
              </VStack>
              {/* Speaker Icon for Text-to-Speech */}
              <IconButton
                aria-label="Play message"
                icon={<FiVolume2 />}
                onClick={() => speakMessage(message.body)}
                colorScheme="teal"
                variant="ghost"
              />
            </HStack>
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
          onClick={handleSendMessage}
          rightIcon={<FiSend />}
        >
          Send
        </Button>
      </HStack>
    </Flex>
  );
};

export default ChatRoom;
