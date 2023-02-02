import React, { useState, useEffect } from "react";
import CompanyManage from "../services/CompanyManage";
import UserManage from "../services/UserManage";
import {
  Container,
  Button,
  useToast,
} from "@chakra-ui/react";

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
            if (ret.status !== 200) i.from = ret.data;
          }
          return i;
        })
      );
      setNotification(tmp);
    }
    if (notifications) fetchData();
  }, [notifications]);

  return (
    <Container maxW="100%">
      <div className="flex flex-col">
        {not.length > 0
          ? not?.map((i) => {
              return (
                <div className="flex flex-col mt-2">
                  <span>{i.content}</span>
                  <span>{i.timestamp}</span>
                  <span>{i.from.name}</span>
                  {!i.read && <span>Not read</span>}
                  <span className="flex flex-1">
                    <Button className="m-auto" onClick={() => setRead(i._id)}>
                      {i.read ? "Set to unread" : "Set to read"}
                    </Button>
                    <Button
                      colorScheme={"red"}
                      className="m-auto"
                      onClick={() => delNot(i._id)}
                    >
                      Delete
                    </Button>
                  </span>
                </div>
              );
            })
          : "No notifications"}
      </div>
    </Container>
  );
};

export default NotificationItem;
