import React from "react";

import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        // eslint-disable-next-line react/prop-types
        messages.map((msg, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: `${
                msg.sender._id !== user._id ? "start" : "end"
              }`,
              paddingInline: 5,
            }}
            key={msg._id}
          >
            {isSameSender(messages, msg, i, user._id) ||
            isLastMessage(messages, i, user._id) ? (
              <Tooltip
                label={msg.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={msg.sender.name}
                  src={msg.sender.pic}
                  display={msg.sender._id !== user._id ? "flex" : "none"}
                />
              </Tooltip>
            ) : (
              <></>
            )}

            <span
              style={{
                backgroundColor: `${
                  msg.sender._id === user._id ? "#bee3f8" : "orange"
                }`,

                borderRadius: "15px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, msg, i, user._id),

                marginTop: isSameUser(messages, msg, i) ? 3 : 10,
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
