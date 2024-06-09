import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import ChatLoading from "../ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import "../styles.css";
// import { axiosInstance, baseURL } from "../../config/axiosInstance";

const MyChats = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchAgain,
  } = ChatState();
  const toast = useToast();

  const fetchChats = async (user) => {
    // console.log("user inside fetch", user);
    if (!user) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // const { data } = await axiosInstance(user).get(baseURL + "/api/chat");
      const { data } = await axios.get("/api/chat", config);

      console.log(data, "data");
      setChats(data);
    } catch (error) {
      toast({
        title: "Oops! Error occured!",
        description: error.response.data.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchChats(user);
  }, [user, !fetchAgain]);

  chats.map((chat) => {
    const latestMessage = chat.latestMessage;
  });

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"whitesmoke"}
      w={{ base: "100%", md: "32%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "32px" }}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<FaPlus />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#e8e8e8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        <div className="messages">
          {chats ? (
            <Stack overflowY={"scroll"}>
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor={"pointer"}
                  bg={selectedChat === chat ? "#38b2ac" : "whitesmoke"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={chat._id}
                >
                  <Text>
                    {chat.isGroupChat
                      ? chat.chatName
                      : getSender(user, chat.users)}
                  </Text>
                  <Text display={"flex"} gap={4} fontSize={12}>
                    <b>
                      {chat.latestMessage !== (undefined || null) &&
                        getSender(chat.latestMessage?.sender, chat.users)}
                      :
                    </b>
                    {chat.latestMessage !== (undefined || null) &&
                      chat.latestMessage.content}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </div>
      </Box>
    </Box>
  );
};

export default MyChats;
