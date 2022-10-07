import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import PostManage from "../services/PostManage";
import { useNavigate } from "react-router-dom";
import NewPost from "../components/NewPost";
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
  const [showModal, setShowModal] = useState(false);

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
      <button onClick={() => { setShowModal(true) }} className="btn btn-secondary mt-2">
        New post
      </button>
      
      {showModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
          <div className="relative w-full my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  New post
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">X</span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <NewPost style={{display:'flex', height:'100%'}} />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          </div>
          ) : null}

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