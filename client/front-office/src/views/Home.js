import React, { useEffect, useState } from "react";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Heros from "../components/Heros";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div data-theme="lemonade" className="App flex h-screen flex-1" style={{flexDirection:"column", justifyContent:"space-between", maxHeight:"100%"}}>
      <div className="flex flex-1" style={{minHeight:"6%"}}>
        <Navbar />
      </div>
      <div className="flex flex-1" style={{height:"78%"}}>
        <Heros style={{display:'flex', height:'100%'}} />
      </div>
      <div className="flex flex-1" style={{minHeight:"16%"}}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
