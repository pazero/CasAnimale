import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartList from "../components/CartList";
import Cookies from "js-cookie";

const Cart = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div
      data-theme="lemonade"
      className="flex h-full flex-1"
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: "100%",
      }}
    >
      <div className="flex flex-1" style={{ height: "4rem", maxHeight: "4rem" }}>
        <Navbar />
      </div>

      <div className="flex justify-center my-8 h-screen ">
        <CartList />
      </div>

      <div className="flex flex-1 h-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;