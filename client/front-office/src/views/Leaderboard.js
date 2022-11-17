import React from "react";
import Footer from "../components/Footer";
import Board from "../components/BoardItem";
import Navbar from "../components/Navbar";

const Leaderboard = () => {
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
      <div className="flex flex-1" style={{ height: "auto" }}>
        <Board />
      </div>
      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Leaderboard;
