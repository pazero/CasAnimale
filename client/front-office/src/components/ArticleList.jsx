import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserManage from "../services/UserManage";
import PostManage from "../services/PostManage";
import Post from "./Post";
import NewPost from "./NewPost";
import { Heading, Text, Container } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const ArticleList = ({ name, description, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchData() {
      const { data: posts } = await PostManage.getPosts({ type: type });
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

      try {
        const { data: userData } = await UserManage.getUser();
        setUser(userData);
      } catch (e) {
        setUser(null);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxW="100%">
      {token ? (
        <button onClick={onOpen} className="btn btn-secondary mt-2 mb-4">
          New post
        </button>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new post!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <NewPost type={type} style={{ display: "flex", height: "100%" }} />
          </ModalBody>

          <ModalFooter>
            <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
              * required field
            </div>
            <Button colorScheme={"red"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Container maxW={"4xl"} p="12" pt="0" className="mt-3">
        <Heading as="h1" className="mt-2">
          {name}
        </Heading>
        <Text className="text-lg">{description}</Text>
        {posts.map((post, i) =>
          user !== null ? (
            <Post
              data={post}
              isUserLoggedPost={post.userid === user._id}
              key={i}
            />
          ) : (
            <Post data={post} isUserLoggedPost={false} key={i} />
          )
        )}
      </Container>
    </Container>
  );
};

export default ArticleList;
