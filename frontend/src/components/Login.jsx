import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseURL } from "../config/axiosInstance";

const Login = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill out all the fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        "content-type": "application/json",
      };

      const datas = { email, password };

      const { data } = await axios.post("/api/user/login", datas, config);
      toast({
        title: "You're logged in successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userDetails", JSON.stringify(data));
      setLoading(false);

      history.push("/chats");
    } catch (error) {
      toast({
        title: "Oops! something wnet wrong",
        // description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"9px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="Password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width={"4.5rem"} mr={"-12px"}>
            <Button h={"1.9rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com"), setPassword("abc123");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
