import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "../SingleChat";

const ChatBox = () => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems={"center"}
      flexDir={"column"}
      bg={"white"}
      w={{ base: "100%", md: "67%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
