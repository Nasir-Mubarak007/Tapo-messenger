import { Box } from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      variant={"solid"}
      fontSize={12}
      background={"tomato"}
      color={"white"}
      cursor={"pointer"}
      onClick={handleFunction}
      display={"flex"}
      alignItems={"center"}
    >
      {user.name}
      <FaTimes style={{ marginLeft: "4px" }} />
    </Box>
  );
};

export default UserBadgeItem;
