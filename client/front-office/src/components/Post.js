import React from "react";
import PostManage from "../services/PostManage";
import { Image, Box, Heading, Text, HStack, Button } from "@chakra-ui/react";

const ArticleList = (props) => {
  const deletePost = async () => {
    const { data: msg } = await PostManage.deletePost(props.data._id);
    alert(msg.message);
    window.location.reload()
  };

  return (
    <Box
      key={props.data._id}
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
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
          <Heading marginTop="1">
            <div>{props.data.title}</div>
          </Heading>
          <Text as="p" marginTop="2" fontSize="lg">
            <div>{props.data.description}</div>
          </Text>
          {props.data?.photo ? <Image src={props.data?.photo} boxSize="fill" alt="post-img" /> : null}
          <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Text fontWeight="medium">
              Posted by:{" "}
              <span className="font-bold">
                {props.data.author.name} {props.data.author.surname}
              </span>
            </Text>
            <Text>—</Text>
            <Text>{props.data.date.replace("T", " ").slice(0, -5)}</Text>
          </HStack>

          {props.isUserLoggedPost ? (
            <Button
              colorScheme="red"
              className="m-auto mt-2"
              onClick={deletePost}
            >
              Delete this post
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleList;
