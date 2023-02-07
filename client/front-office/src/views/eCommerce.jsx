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
  ModalFooter,
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
  const {
    isOpen: isOpenNewProd,
    onOpen: onOpenNewProd,
    onClose: onCloseNewProd,
  } = useDisclosure();
  const [user, setUser] = useState([]);
  const token = Cookies.get("token");

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
        {token ? <Button onClick={onOpenNewProd}>Sell an object</Button> : null}

        <Button className="ml-2" onClick={onOpen}>
          Filters
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col">
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

          <ModalFooter>
            <Button colorScheme={"red"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenNewProd} onClose={onCloseNewProd}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell a new product!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <NewProduct style={{ display: "flex", height: "100%" }} />
          </ModalBody>

          <ModalFooter>
            <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
              * required field
            </div>
            <Button colorScheme={"red"} onClick={onCloseNewProd}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box className="flex justify-evenly grow-0 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
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
