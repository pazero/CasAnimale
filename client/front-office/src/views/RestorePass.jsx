import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Cookies from "js-cookie";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const toast = useToast();
  const [email, setEmail] = useState([]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const sendMail = async (e) => {
    e.preventDefault();
    const msg = await UserManage.restore({
      mail: email,
    });
    if (msg.status.toString() === "200") {
      toast({
        title: "Email restored successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
    } else
      toast({
        title: "Ops something went wrong!",
        description:
          "If you can't proceed restoring your password try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={sendMail}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
