import React, { useEffect, useState } from "react";
import ProdManage from "../services/ProductManage";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProduct from "../components/NewProduct";
import { Button, Grid } from "@chakra-ui/react";
import Cookies from "js-cookie";

const Home = () => {
  const [products, setProducts] = useState([]);
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);

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

      {token ? (
        <div className="flex m-2">
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Sell an object
          </Button>
        </div>
      ) : null}

      {showModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">New product</h3>
              </div>
              {/*body*/}
              <div className="relative p-5 flex-auto">
                <NewProduct style={{ display: "flex", height: "100%" }} />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-5 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null}

      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        {products.map((product) => (
          <Product
            padding="1fr"
            id={product._id}
            title={product.name}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </Grid>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
