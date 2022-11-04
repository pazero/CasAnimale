import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarProfile";
import PetsList from "../components/PetsList";
import Cookies from "js-cookie";

const ProfilePets = () => {
  const token = Cookies.get("token");


  return (
    <div
      data-theme="lemonade"
      className="flex h-screen flex-1"
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
      <div class="static inline-flex">
        <div class="inline-block">
          <Sidebar />
        </div>

        <div className="flex flex-1 inline-block" style={{ height: "auto" }}>
          <PetsList />
        </div>
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePets;
