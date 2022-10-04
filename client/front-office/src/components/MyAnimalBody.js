import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import PostManage from "../services/PostManage";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';



const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};


const ArticleList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostManage.getPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);

  const [user, setUser] = useState([]);  /** user */


  return (
    <Container maxW="100%">
      <a onClick={() => { navigate("/newpost"); }} className="btn btn-secondary mt-2">
        new post
      </a>
      <Container maxW={'7xl'} p="12" pt="0">
        <Heading as="h1">Posts</Heading>
        {posts.map((post) => {        /** post */

          UserManage.getUser(post.userid).then((res) => {
            setUser(res.data);
          });

          return (
            <Box
              marginTop={{ base: '1', sm: '5' }}
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent="space-between">
              <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center">
                
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: '3', sm: '0' }}>
                  <BlogTags tags={['Cat', 'Brown']} />
                  <Heading marginTop="1">
                    <div key={post._id}>{post.title}</div>
                  </Heading>
                  <Text
                    as="p"
                    marginTop="2"
                    /*color={useColorModeValue('gray.700', 'gray.200')}*/
                    fontSize="lg">
                    <div key={post._id}>{post.description}</div>
                  </Text>
                  <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
                    <Text fontWeight="medium">{user.name} {user.surname}</Text>
                    <Text>—</Text>
                    <Text>{post.date}</Text>
                  </HStack>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Container>
    </Container>
  );
};

export default ArticleList;