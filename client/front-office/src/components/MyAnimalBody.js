import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import PostManage from "../services/PostManage";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  HStack,
  Container,
} from '@chakra-ui/react';

const ArticleList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);


  useEffect(async () => {
    const { data: posts } = await PostManage.getPosts();
    setPosts(await Promise.all(posts.map(async(post,i) => 
      {
        const { data: author } = await UserManage.getUser(post.userid);

        return{...post,author}   /** crea un nuovo oggetto con tutto il contenuto di post e la chiave users con valore dell'author */
      }
    )))
  }, []);

  console.log(posts);

  return (
    <Container maxW="100%">
      <a onClick={() => { navigate("/newpost"); }} className="btn btn-secondary mt-2">
        new post
      </a>
      <Container maxW={'7xl'} p="12" pt="0">
        <Heading as="h1">Posts</Heading>
        {posts.map((post) =>         /** post */
          (
            <Box key={post._id}
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
                  <Heading marginTop="1">
                    <div>{post.title}</div>
                  </Heading>
                  <Text
                    as="p"
                    marginTop="2"
                    /*color={useColorModeValue('gray.700', 'gray.200')}*/
                    fontSize="lg">
                    <div>{post.description}</div>
                  </Text>
                  <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
                    <Text fontWeight="medium">{post.author.name} {post.author.surname}</Text>
                    <Text>—</Text>
                    <Text>{post.date}</Text>
                  </HStack>
                </Box>
              </Box>
            </Box>
          )
        )}
      </Container>
    </Container>
  );
};

export default ArticleList;