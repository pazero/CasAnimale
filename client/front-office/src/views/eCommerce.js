import React, { useEffect, useState } from "react";
import ProdManage from "../services/ProductManage";
import UserManage from "../services/UserManage";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProduct from "../components/NewProduct";
import {
  Button,
  Grid,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
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
      await ProdManage.getProducts().then((res) => {
        // eslint-disable-next-line
        res.data.map((prod) => {
          // eslint-disable-next-line
          prod.tags.map((el) => {
            if (filt[el]) filt[el] += 1;
            else filt[el] = 1;
          });
        });
        setAllProducts(res.data);
      });
      setFilters(filt);

      try {
        const { data: userData } = await UserManage.getUser();
        setUser(userData);
      } catch {}
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

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {products.map((product) => (
          <Center>
            <Product
              data={product}
              isUserLoggedPost={product.seller === user._id}
            />
          </Center>
        ))}
      </Grid>

      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default ECommerce;
