import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserManage from "../services/UserManage";
import PostManage from "../services/PostManage";
import NewPost from "./NewPost";
import { Image, Box, Heading, Text, HStack, Container } from "@chakra-ui/react";

const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchData() {
      const { data: posts } = await PostManage.getPosts();
      /* crea un nuovo oggetto con tutto il contenuto di post e la chiave users con valore dell'author */
      setPosts(
        await Promise.all(
          posts.map(async (post, i) => {
            const { data: author } = await UserManage.getUser(post.userid);
            return {
              ...post,
              author,
            };
          })
        )
      );
    }
    fetchData();
  }, []);

  return (
    <Container maxW="100%">
      {token ? (
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="btn btn-secondary mt-2 mb-4"
        >
          New post
        </button>
      ) : null}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New post</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <NewPost style={{ display: "flex", height: "100%" }} />
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
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Container maxW={"7xl"} p="12" pt="0">
        <Heading as="h1">Posts</Heading>
        {posts.map((post /** post */) => (
          <Box
            key={post._id}
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
                  <div>{post.title}</div>
                </Heading>
                <Text as="p" marginTop="2" fontSize="lg">
                  <div>{post.description}</div>
                </Text>
                <Image src={post.photo} boxSize="fill" />
                <HStack
                  marginTop="2"
                  spacing="2"
                  display="flex"
                  alignItems="center"
                >
                  <Text fontWeight="medium">
                    {post.author.name} {post.author.surname}
                  </Text>
                  <Text>—</Text>
                  <Text>{post.date}</Text>
                </HStack>
              </Box>
            </Box>
          </Box>
        ))}
      </Container>
    </Container>
  );
};

export default ArticleList;
