import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Blog from "../components/ArticleList";
import Navbar from "../components/Navbar";
import UserManage from "../services/UserManage";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  
  useEffect(() => {
    async function fetchData() {
      const { data: userData } = await UserManage.getUser();
      setUser(userData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      if (!user.vip) navigate("/");
    }
  }, [user]);

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
      <div className="flex flex-1">
        <Blog
          name={"HelpMe!"}
          description={"Post on this board to seek for help on the comunity"}
          type={"helpme"}
          style={{ display: "flex", height: "100%" }}
        />
      </div>
      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default Forum;
