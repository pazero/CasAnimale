import React from "react";
import PostManage from "../services/PostManage";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Show,
  useToast,
} from "@chakra-ui/react";

const Post = (props) => {
  const toast = useToast();

  const navigate = useNavigate();

  const deletePost = async () => {
    const data = await PostManage.deletePost(props.data._id);
    if (data.status === 200) {
      toast({
        title: "Post deleted successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
      document.getElementById(props.data._id).style.display = "none";
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed with the removal try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  };

  return (
    <Box
      id={props.data._id}
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight={{ base: "0", sm: "3" }}
        position="relative"
        alignItems="center"
      >
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
          padding="2"
          paddingLeft="4"
          backgroundColor="gray.50"
          borderRadius="md"
        >
          <Heading marginTop="1" fontSize={{ base: "xl", sm: "3xl" }}>
            <div>{props.data.title}</div>
          </Heading>

          {props.data?.photo ? (
            <Box display="flex" flexDirection={{ base: "column", sm: "row" }}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexShrink="0"
                marginTop="3"
              >
                <Image
                  src={props.data?.photo}
                  boxSize="fill"
                  h={"max"}
                  w={"max"}
                  maxWidth={"10rem"}
                  maxHeight={"10rem"}
                  alt={"post " + props.data.title + " img"}
                />
              </Box>
              <Text
                marginLeft={{ base: "0", sm: "3" }}
                fontSize={{ base: "md", sm: "lg" }}
              >
                <div>{props.data.description}</div>
              </Text>
            </Box>
          ) : (
            <Text as="p" marginTop="2" fontSize={{ base: "md", sm: "lg" }}>
              <div>{props.data.description}</div>
            </Text>
          )}

          <HStack
            marginTop="2"
            spacing="2"
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            alignItems="center"
            fontSize={{ base: "md", sm: "lg" }}
          >
            <Text fontWeight="medium">
              Posted by:{" "}
              <span className="font-bold">
                {props.data.author.name} {props.data.author.surname}
              </span>
            </Text>
            <Show above="sm">&nbsp;—</Show>
            <Text>{props.data.date.replace("T", " ").slice(0, -5)}</Text>
          </HStack>

          <div className="flex flex-1 justify-center mt-2">
            {props.isUserLoggedPost ? (
              <Button
                size="sm"
                colorScheme="red"
                className="mr-2"
                onClick={deletePost}
              >
                Delete
              </Button>
            ) : null}
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => {
                navigate("/thread/" + props.data._id);
              }}
            >
              View thread
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
