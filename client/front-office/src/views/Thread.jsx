import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostManage from "../services/PostManage";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import {
  Image,
  Box,
  Heading,
  Text,
  HStack,
  Show,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

const Thread = () => {
  const params = useParams();
  const toast = useToast();
  const token = Cookies.get("token");
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState("");
  const [op, setOp] = useState({});
  const [user, setUser] = useState(null);

  const addComment = async () => {
    if (token) {
      var newCommObj = {
        user: user._id,
        content: newComment,
        date: new Date().toISOString(),
      };
      var newComments = [...post.comments, newCommObj];
      const ret = await PostManage.updatePost(params.id, {
        comments: newComments,
      });
      if (ret.status === 200) {
        toast({
          title: "Comment posted successfully!",
          status: "success",
          duration: 3000,
          variant: "subtle",
          position: "top-center",
        });
        let newPost = post;
        newPost.comments = newComments;
        setNewComment("");
        setPost(newPost);
      } else
        toast({
          title: "Ops something went wrong!",
          description: "If you can't proceed posting try to re-access.",
          status: "error",
          duration: 3000,
          variant: "subtle",
          position: "top-center",
        });
    } else {
      toast({
        title: "Log-in first!",
        status: "warning",
        duration: 3000,
        variant: "subtle",
        position: "top-center",
      });
    }
  };

  const delComment = async (item) => {
    let newComments = post.comments.filter((i) => i !== item);
    const ret = await PostManage.updatePost(params.id, {
      comments: newComments,
    });
    if (ret.status.toString() === "200") {
      let newPost = post;
      newPost.comments = newComments;
      setPost(newPost);
      toast({
        title: "Comment removed successfully!",
        status: "success",
        duration: 3500,
        variant: "subtle",
        position: "top-center",
      });
    } else
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed posting try to re-access.",
        status: "error",
        duration: 3500,
        variant: "subtle",
        position: "top-center",
      });
  };

  useEffect(() => {
    const fetchPost = async (id) => {
      // get current user
      try {
        const { data: userData } = await UserManage.getUser();
        setUser(userData);
      } catch {
        setUser(null);
      }

      // get post info
      const { data: postData } = await PostManage.getPost(id);

      // get origin poster info
      const { data: opData } = await UserManage.getUser(postData.userid);
      setOp(opData);

      // get comment and user info
      postData.comments = await Promise.all(
        postData.comments.map(async (item) => {
          if (item?.user !== undefined) {
            const { data: userCommentData } = await UserManage.getUser(
              item.user
            );
            return {
              user: userCommentData,
              content: item.content,
              date: item.date,
            };
          } else return null;
        })
      );

      setPost(postData);
    };
    fetchPost(params.id);
  }, [post]);

  return (
    <div
      data-theme="lemonade"
      className="App flex h-screen flex-1"
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: "100%",
      }}
    >
      <div
        className="flex flex-1"
        style={{ height: "4rem", maxHeight: "4rem" }}
      >
        <Navbar />
      </div>
      <div className="flex flex-1 justify-center">
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
                <div>{post.title}</div>
              </Heading>

              {post.photo !== "" ? (
                <Box
                  display="flex"
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    flexShrink="0"
                  >
                    <Image
                      src={post.photo}
                      boxSize="fill"
                      h={"8rem"}
                      w={"8rem"}
                      alt="post-img"
                    />
                  </Box>
                  <Text
                    as="p"
                    marginTop="3"
                    marginLeft={{ base: "0", sm: "3" }}
                    fontSize={{ base: "md", sm: "lg" }}
                  >
                    <div>{post.description}</div>
                  </Text>
                </Box>
              ) : (
                <Text as="p" marginTop="2" fontSize={{ base: "md", sm: "lg" }}>
                  <div>{post.description}</div>
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
                    {op.name} {op.surname}
                  </span>
                </Text>
                <Show above="sm">&nbsp;—</Show>
                <Text>{post.date?.replace("T", " ").slice(0, -5)}</Text>
              </HStack>

              <div className="mt-5 p-2 border rounded">
                <div>
                  <FormLabel>Write a comment under this post!</FormLabel>
                  <Input
                    value={newComment}
                    type="text"
                    placeholder="Write here..."
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    className="mt-2"
                    size={"sm"}
                    colorScheme={"red"}
                    onClick={addComment}
                  >
                    Comment
                  </Button>
                </div>
                {/* comment section */}
                <div className="mt-2">
                  {post?.comments?.map((item, i) => {
                    if (item === null) return;
                    return (
                      <Box className="p-2 m-2 mt-0" key={i}>
                        <Box
                          display="flex"
                          flexDirection={{ base: "column", sm: "row" }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            flexShrink="0"
                          >
                            <Image
                              borderRadius="full"
                              boxSize="75px"
                              src={item?.user?.photo}
                              alt="post-img"
                            />
                          </Box>
                          <Text
                            as="p"
                            marginTop="3"
                            marginLeft={{ base: "0", sm: "3" }}
                            fontSize={{ base: "md", sm: "lg" }}
                          >
                            <div className="flex flex-col">
                              <span className="text-md">{item?.content}</span>
                              <span className="text-xs">
                                Posted by{" "}
                                <span className="font-bold mr-1">
                                  {item?.user?.name} {item?.user?.surname}
                                </span>
                                on {item?.date?.replace("T", " ").slice(0, -5)}
                              </span>
                            </div>
                          </Text>

                          {item.user._id === user._id && (
                            <Button
                              onClick={() => {
                                delComment(item);
                              }}
                              className="ml-4 mt-3"
                              colorScheme={"red"}
                              size={"sm"}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"
                                  fill="rgba(255,255,255,1)"
                                />
                              </svg>
                            </Button>
                          )}
                        </Box>
                        <div class="divider"></div>
                      </Box>
                    );
                  })}
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </div>
      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default Thread;
