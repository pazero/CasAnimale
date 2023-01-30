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

const Review = ({ data, user }) => {
  const token = Cookies.get("token");
  const [newComment, setNewComment] = useState("");
  const toast = useToast();

  const addReview = async () => {
    if (token) {
      const ret = await CompanyManage.updateCompany(data._id, {
        review: [
          ...data.review,
          { userid: user._id, content: newComment, date: new Date() },
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

  return (
    <div className="flex flex-col my-4 mx-3">
      <div className="my-2 md:my-4 self-center text-center text-xl font-semibold uppercase">
        Reviews
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="sm:text-lg md:mr-6">
          <FormLabel fontSize={{ base: "md", lg: "lg" }}>
            Write a review for this company!
          </FormLabel>
          <Textarea
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
          {data.review?.length === 0 ? (
            <div className="text-md">Be the first one writing a review!</div>
          ) : (
            data.review?.map((item, i) => (
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
                      src={
                        item.user?.photo === "" ||
                        item.user?.photo === undefined
                          ? "/f/userIcon.svg"
                          : item.user?.photo
                      }
                      alt="user profile image"
                    />
                  </Box>
                  <Container maxW="md" marginLeft="1" paddingLeft="1">
                    <Text
                      as="p"
                      marginLeft={{ base: "0", sm: "1" }}
                      fontSize={{ base: "md", sm: "lg" }}
                      maxWidth={{ base: "sm" }}
                    >
                      <div className="flex flex-col">
                        <span className="text-md font-semibold mb-1">
                          {item.user?.name} {item.user?.surname}
                        </span>
                        <span className="text-sm mb-1">
                          {item.date?.substring(0, 10)}
                        </span>
                        <span className="text-md">{item.content}</span>
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
