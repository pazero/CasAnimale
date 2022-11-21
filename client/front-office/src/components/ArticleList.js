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

      <Container maxW={"4xl"} p="12" pt="0">
        <Heading as="h1" className="mt-2">
          Eccolo qua!
        </Heading>
        <Text className="text-lg">Here you can share you pet!</Text>
        {posts.map((post) => (
          <Post data={post} isUserLoggedPost={post.userid === user._id} />
        ))}
      </Container>
    </Container>
  );
};

export default ArticleList;
