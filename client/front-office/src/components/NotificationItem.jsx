import React, { useState, useEffect } from "react";
import CompanyManage from "../services/CompanyManage";
import UserManage from "../services/UserManage";
import { Container, Button, useToast, Heading } from "@chakra-ui/react";

const NotificationItem = ({ user, notifications }) => {
  const toast = useToast();
  const [not, setNotification] = useState([]);

  const setRead = async (id) => {
    var tmp = not.map((i) => {
      if (i._id === id) i.read = !i.read;
      return i;
    });
    setNotification(tmp);
    const ret = await UserManage.updateUser({ notification: tmp });
    if (ret.status === 200)
      toast({
        title: "Message: " + ret.data.message,
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
    else
      toast({
        title: "Something went wrong with the update",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
  };

  const delNot = async (id) => {
    var tmp = not.filter((i) => i._id !== id);
    setNotification(tmp);
    const ret = await UserManage.updateUser({ notification: tmp });
    if (ret.status === 200)
      toast({
        title: "Deleted sucessfully",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
    else
      toast({
        title: "Something went wrong with the elimination",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
  };

  useEffect(() => {
    async function fetchData() {
      var tmp = await Promise.all(
        notifications.map(async (i) => {
          if (i.from && i.from !== "admin") {
            var ret = await CompanyManage.getCompany(i.from);
            if (ret.status === 200) i.from = ret.data;
            else return { name: "admin" };
          } else return { name: "admin" };
          return i;
        })
      );
      setNotification(tmp);
    }
    if (notifications) fetchData();
  }, [notifications]);

  return (
    <Container maxW="100%" height={"full"}>
      <Heading as="h1" className="my-3 md:my-5 md:ml-6">
        Your notifications
      </Heading>
      <div className="flex flex-col justify-center md:ml-6">
        {not.length > 0 ? (
          not?.map((item, i) => {
            return (
              <div
                className="flex flex-col md:flex-row self-start rounded-xl p-2 bg-gray-50 text-md"
                key={i}
              >
                <div className="flex flex-col mt-2">
                  <span>{item.content}</span>
                  <span>
                    Prenotation modified by{" "}
                    <span className="font-semibold">
                      {item.from?.name === undefined
                        ? "admin"
                        : item.from?.name}
                    </span>{" "}
                    on{"  "}
                    <span className="font-semibold">
                      {item.timestamp.substring(0, 10)},{" "}
                      {item.timestamp.substring(11, 16)}
                    </span>
                  </span>
                  {!item.read && (
                    <span className="text-red-600 font-semibold">Not read</span>
                  )}
                </div>
                <div className="flex flex-row mt-2 md:mt-0 md:flex-col ml-6">
                  <Button
                    backgroundColor={"gray.300"}
                    className="m-auto mb-2 rounded-lg font-semibold"
                    onClick={() => setRead(item._id)}
                  >
                    {item.read ? "mark as unread" : "mark as read"}
                  </Button>
                  <Button
                    backgroundColor={"red.200"}
                    className="m-auto rounded-lg font-semibold"
                    onClick={() => delNot(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center h-full">
            <img
              src="/f/noNotification.jpg"
              alt="no notification yet image"
              className="self-center"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default NotificationItem;
