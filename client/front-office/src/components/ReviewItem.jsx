import React, { useState } from "react";
import CompanyManage from "../services/CompanyManage";
import Cookies from "js-cookie";
import {
  Image,
  Box,
  Text,
  FormLabel,
  Textarea,
  Button,
  useToast,
  Container,
} from "@chakra-ui/react";

const Review = ({ company, setCompany, user }) => {
  const token = Cookies.get("token");
  const [newComment, setNewComment] = useState("");
  const toast = useToast();

  const addReview = async () => {
    if (token) {
      const ret = await CompanyManage.updateCompany(company._id, {
        review: [
          ...company.review,
          { user: user._id, content: newComment, date: new Date() },
        ],
      });
      if (ret.status.toString() === "200") {
        toast({
          title: "Review posted successfully!",
          status: "success",
          duration: 3000,
          variant: "subtle",
        });
        window.location = window.location;
      } else
        toast({
          title: "Ops something went wrong!",
          description: "If you can't proceed reviewing try to re-access.",
          status: "error",
          duration: 3000,
          variant: "subtle",
        });
    } else {
      toast({
        title: "Log-in first!",
        status: "warning",
        duration: 3000,
        variant: "subtle",
      });
    }
  };

  const delReview = async (item) => {
    var ret;
    const newReview = company.review.filter((i) => i !== item);
    if (newReview.length > 0) {
      ret = await CompanyManage.updateCompany(company._id, {
        review: newReview,
      });
    } else {
      ret = await CompanyManage.updateCompany(company._id, {
        review: [],
      });
    }
    if (ret.status === 200) {
      toast({
        title: "Removed done!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
      window.location.reload();
    } else {
      toast({
        title: "Somethings wrong!",
        status: "warning",
        duration: 3000,
        variant: "subtle",
      });
    }
  };

  return (
    <div className="flex flex-col my-4 mx-3">
      <div className="my-2 md:my-4 self-center text-center text-xl font-semibold uppercase">
        Reviews
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="sm:text-lg md:mr-6">
          <FormLabel fontSize={{ base: "md", lg: "lg" }} for="comment">
            Write a review for this company!
          </FormLabel>
          <Textarea
            id="comment"
            placeholder="Write here..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            className="mt-2"
            size={"sm"}
            colorScheme={"gray"}
            onClick={addReview}
          >
            Send
          </Button>
        </div>
        {/* comment section */}
        <div className="md:ml-6 mt-3 sm:mt-0">
          {company.review?.length === 0 ? (
            <div className="text-md">Be the first one writing a review!</div>
          ) : (
            company.review?.map((item, i) => (
              <Box
                className="px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 my-2"
                key={i}
              >
                <Box display="flex" flexDirection="row">
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    flexShrink="0"
                  >
                    <Image
                      borderRadius="full"
                      boxSize={{ base: "35px", md: "70px" }}
                      src={item.user?.photo === "" || item.user?.photo === undefined ? "/f/userIcon.svg" : item.user?.photo}
                      alt={item.user?.email === "" || item.user?.email === undefined ? item.user?.name + " " + item.user?.surname + " propic" : item.user?.email + " propic"}
                    />
                  </Box>
                  <Container maxW="md" marginLeft="1" paddingLeft="1">
                    <Text
                      as="p"
                      marginLeft={{ base: "0", sm: "1" }}
                      fontSize={{ base: "md", sm: "lg" }}
                      maxWidth={{ base: "sm" }}
                    >
                      <div className="flex flex-1">
                        <div className="flex flex-col">
                          <span className="text-md font-semibold mb-1">
                            {item.user?.name} {item.user?.surname}
                          </span>
                          <span className="text-sm mb-1">
                            {item.date?.substring(0, 10)}
                          </span>
                          <span className="text-md">{item.content}</span>
                        </div>
                        {user._id === item.user?._id && (
                          <Button
                            onClick={() => {
                              delReview(item);
                            }}
                            className="m-4 mt-5"
                            colorScheme={"red"}
                            size={"sm"}
                            justify="center"
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
                      </div>
                    </Text>
                  </Container>
                </Box>
              </Box>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
