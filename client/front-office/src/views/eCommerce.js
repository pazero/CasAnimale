import React, { useEffect, useState } from "react";
import ProdManage from "../services/ProductManage";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await ProdManage.getProducts().then((res) => {
        setProducts(res.data);
      });
    }
    fetchData();
  }, []);

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

      {products.map((product, key) => (
        <Product
          id={key.toString()}
          title={product.name.toString()}
          description={product.description.toString()}
          price={product.price.toString()}
        />
      ))}
      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
