import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NotificationItem from "../components/NotificationItem";
import Sidebar from "../components/SidebarProfile";

const Notification = () => {
  const [user, setUser] = useState({});
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      var ret = await UserManage.getUser();
      setUser(ret.data);
      setNotification(ret.data.notification);
    };
    fetchUser();
  }, []);

  return (
    <div
      data-theme="lemonade"
      className="flex h-screen flex-1"
      style={{ flexDirection: "column", maxHeight: "100%" }}
    >
      <div
        className="flex flex-1"
        style={{ height: "4rem", maxHeight: "4rem" }}
      >
        <Navbar />
      </div>

      <div className="hidden sm:flex static inline-flex flex-1">
        <div className="inline-block flex">
          <Sidebar />
        </div>

        <div className="flex flex-1 inline-block" style={{ height: "auto" }}>
          <NotificationItem user={user} notifications={notifications} />
        </div>
      </div>

      <div className="sm:hidden flex flex-col justify-items-stretch flex-1">
        <div className="flex w-full justify-evenly">
          <Sidebar />
        </div>

        <div className="flex relative">
          <div
            className="flex object-left-top w-full"
            style={{ height: "auto" }}
          >
            <NotificationItem notifications={notifications} />
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Notification;
