import React, { useEffect, useState } from "react";
import ProdManage from "../services/ProductManage";
import UserManage from "../services/UserManage";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProduct from "../components/NewProduct";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import Cookies from "js-cookie";

const ECommerce = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [liveFilters, setLiveFilters] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState([]);
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      var filt = {};
      var prods = [];
      var userData;

      var res = await ProdManage.getProducts();
      prods = res.data;

      try {
        userData = await UserManage.getUser();
        userData = userData.data;
        setUser(userData);
      } catch {
        userData = null;
      }

      // filter out vip products
      if (!userData?.vip) prods = prods.filter((x) => !x.tags.includes("vip"));
      setAllProducts(prods);

      // get filters
      // eslint-disable-next-line
      prods.map((p) => {
        // eslint-disable-next-line
        p.tags.map((el) => {
          if (filt[el]) filt[el] += 1;
          else filt[el] = 1;
        });
      });

      setFilters(filt);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (liveFilters) {
      const newlist = allProducts.filter((el) => {
        var ret = true;
        liveFilters.forEach((filter) => {
          if (el.tags.indexOf(filter) === -1) ret = false;
        });
        return ret;
      });
      setProducts(newlist);
    }
    if (liveFilters.length === 0) setProducts(allProducts);
    // eslint-disable-next-line
  }, [liveFilters]);

  const setFiltersModal = (filterName) => {
    var isInList = false;
    liveFilters.forEach((el) => {
      if (el === filterName) isInList = true;
    });
    if (isInList) {
      const newlist = liveFilters.filter((item) => item !== filterName);
      setLiveFilters(newlist);
    } else {
      setLiveFilters((last) => [...last, filterName]);
    }
  };

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

      

      <div className="flex m-2">
        {token ? (
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Sell an object
          </Button>
        ) : null}

        <Button className="ml-2" onClick={onOpen}>
          Filters
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col mb-2">
            Group every product by checking the thing that you want!
            {Object.entries(filters).map((key, i) => {
              return (
                <Checkbox
                  isChecked={liveFilters.indexOf(key[0]) !== -1}
                  className={"checkbox-tag"}
                  colorScheme="red"
                  onChange={() => {
                    setFiltersModal(key[0]);
                  }}
                >
                  {key[0]} ({key[1]})
                </Checkbox>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                  <button
                    type="button"
                    class="z-30 absolute top-3 right-2.5 text-red-500 bg-transparent hover:text-red-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative sm:px-5 flex-auto">
                  <NewProduct style={{ display: "flex", height: "100%" }} />
                </div>
                {/*footer*/}
                <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
                  * required field
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Box className="flex justify-evenly grow-0 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {products.map((product, i) => (
            <Product
              data={product}
              key={i}
              isUserLoggedPost={product.seller === user._id}
            />
          ))}
        </div>
      </Box>

      <div className="flex mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default ECommerce;
