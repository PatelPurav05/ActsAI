import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { Box, Input, Button, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

interface ChatRoomProps {
  roomId: Id<"rooms">;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const messages = useQuery(api.messages.getMessagesForRoom, { roomId });
  const sendMessage = useMutation(api.messages.sendMessage);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage({ roomId, body: newMessage, author: "User1" });
      setNewMessage("");
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex direction="column" h="100%" bg="gray.800" p={6} rounded="lg" shadow="md">
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
            bg={message.author === "User1" ? "blue.500" : "gray.700"}
            color="white"
            p={3}
            rounded="lg"
            alignSelf={message.author === "User1" ? "flex-end" : "flex-start"}
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
