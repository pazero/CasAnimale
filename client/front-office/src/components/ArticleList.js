import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserManage from "../services/UserManage";
import PostManage from "../services/PostManage";
import Post from "./Post";
import NewPost from "./NewPost";
import { Heading, Text, Container } from "@chakra-ui/react";

const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
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

      const { data: userData } = await UserManage.getUser();
      setUser(userData);
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
                <div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                  <button type="button" class="z-30 absolute top-3 right-2.5 text-red-500 bg-transparent hover:text-red-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setShowModal(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex relative sm:px-5 flex-auto">
                  <NewPost style={{ display: "flex", height: "100%" }} />
                </div>
                {/*footer*/}
                <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
                    * required field
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Container maxW={"4xl"} p="12" pt="0">
        <Heading as="h1" className="mt-2">
          Eccolo qua!
        </Heading>
        <Text className="text-lg">Here you can share your pet!</Text>
        {posts.map((post) => (
          <Post data={post} isUserLoggedPost={post.userid === user._id} />
        ))}
      </Container>
    </Container>
  );
};

export default ArticleList;
