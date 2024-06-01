import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Auth = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    console.log(user);

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        textAlign={"center"}
        p={3}
        bg="white"
        w="100%"
        m="10px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"3xl"}>Tapo Messenger</Text>
      </Box>

      <Box
        d="flex"
        textAlign={"center"}
        p={3}
        bg="white"
        w="100%"
        m="10px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs align="center" variant={"enclosed"}>
          <TabList mb={".4em"} whiteSpace={"8px"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Auth;
