import React from "react";
import PostManage from "../services/PostManage";
import { Image, Box, Heading, Text, HStack, Button, Show } from "@chakra-ui/react";

const ArticleList = (props) => {
  const deletePost = async () => {
    const { data: msg } = await PostManage.deletePost(props.data._id);
    alert(msg.message);
    window.location.reload();
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
            <Box display="flex" flexDirection={{base:"column", sm:"row"}}>
              <Box display={'flex'} justifyContent={'center'} flexShrink="0">
                <Image src={props.data?.photo} boxSize="fill" h={'8rem'} w={'8rem'} alt="post-img" />
              </Box>
              <Text as="p" marginTop="3" marginLeft={{base:"0", sm:"3"}} fontSize={{base:"md", sm:"lg"}}>
                <div>{props.data.description}</div>
              </Text>
            </Box>
          ) : (
            <Text as="p" marginTop="2" fontSize={{base:"md", sm:"lg"}}>
              <div>{props.data.description}</div>
            </Text>
          )}
          
          <HStack marginTop="2" spacing="2" display="flex" flexDirection={{ base: "column", sm: "row" }} alignItems="center" fontSize={{ base: "md", sm: "lg" }}>
            <Text fontWeight="medium">
              Posted by:{" "}
              <span className="font-bold">
                {props.data.author.name} {props.data.author.surname}
              </span>
            </Text>
            <Show above='sm'>&nbsp;—</Show>
            <Text>{props.data.date.replace("T", " ").slice(0, -5)}</Text>
          </HStack>

          {props.isUserLoggedPost ? (
            <Button
            size="sm"
              colorScheme="red"
              className="m-auto mt-2"
              onClick={deletePost}
            >
              Delete
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleList;
