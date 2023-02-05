import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import ProductManage from "../services/ProductManage";
import { Image, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const CartItem = () => {
  const [prodList, setProdList] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [total, setTotal] = useState(0);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      const ret = await UserManage.getUser();
      const cart = ret.data.cart;
      setTotal(0);
      setIsCartEmpty(true);
      setProdList(
        await Promise.all(
          cart.map(async (item) => {
            const { data: prod } = await ProductManage.getProduct(item.id);
            if (prod && prod.quantity > 0) {
              setTotal((total) => total + prod.price * item.quantity);
              setIsCartEmpty(false);
            }
            return {
              ...item,
              prod,
            };
          })
        )
      );
    }
    fetchData();
  }, []);

  function checkQntMin(qnt, available) {
    if (qnt === 1 || available === 0) return true;
    else return false;
  }

  function checkQntMax(qnt, available) {
    if (qnt === available || available === 0) return true;
    else return false;
  }

  async function buy() {
    const msg = await UserManage.buyUserCart();
    if (msg.status.toString() === "200") {
      setProdList([]);
      setTotal(0);
      setIsCartEmpty(true);
      toast({
        title: "Successful purchase!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed with the purchase try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  }

  async function deleteProductFromCart(id) {
    const msg = await ProductManage.updateCart(id, 0);
    if (msg.status.toString() === "200") {
      let newProdList = prodList.filter((i) => {
        if (i.id !== id) return true;
        else {
          setTotal(total - i.quantity * i.prod.price);
          return false;
        }
      });
      setProdList(newProdList);
      if (newProdList.length === 0) {
        setIsCartEmpty(true);
        setTotal(0);
      }
      toast({
        title: "Successful removal!",
        status: "info",
        duration: 3000,
        variant: "subtle",
      });
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed with the removal try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  }

  useEffect(() => {
    updateTotal();
  }, [prodList]);

  const updateTotal = () => {
    var tmp = 0;
    prodList.forEach((i) => {
      tmp += i.quantity * i.prod.price;
    });
    setTotal(tmp);
  };

  async function updateQnt(id, qnt) {
    if (qnt === 0) deleteProductFromCart(id);
    else {
      const msg = await ProductManage.updateCart(id, qnt);
      if (msg.status === 200) {
        toast({
          title: "Successful update!",
          status: "success",
          duration: 3000,
          variant: "subtle",
        });
        let newProdList = prodList.map((i) => {
          if (i.id === id) i.quantity = qnt;
          return i;
        });
        setProdList(newProdList);
      } else {
        toast({
          title: "Successful removal!",
          status: "danger",
          duration: 3000,
          variant: "subtle",
        });
      }
    }
  }

  return (
    <Box className="flex flex-col ">
      <Heading
        as="h1"
        className="my-4 mt-0 md:mb-5 self-center text-center text-2xl font-semibold sm:text-5xl md:text-6xl uppercase"
      >
        Cart
      </Heading>
      {prodList.map((item, i) => (
        <Box>
          {/** non-small screen */}
          <Box
            key={i}
            className="hidden sm:flex inline-block space-x-8 m-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            {item.prod?.quantity === 0 ? (
              <Box className="flex-none">
                <Image
                  boxSize={{ base: "5rem", md: "8rem" }}
                  src={item.prod?.photo === "" ? "/f/compra.png" : item.prod?.photo}
                  alt={item.prod?.name + " image"}
                  borderRadius="lg"
                  opacity="0.5"
                />
              </Box>
            ) : (
              <Box className="flex-none">
                <Image
                  boxSize={{ base: "5rem", md: "8rem", lg: "10rem" }}
                  src={item.prod?.photo === "" ? "/f/compra.png" : item.prod?.photo}
                  alt={item.prod?.name + " image"}
                  borderRadius="lg"
                />
              </Box>
            )}

            <Box className="self-center flex-auto">
              {item.prod?.quantity === 0 ? (
                <div>
                  <div className="font-semibold uppercase text-gray-300 text-lg">
                    {item.prod?.name}
                  </div>
                  <div className="text-md text-gray-300 font-semibold">
                    {item.prod?.price} &euro;&#x20;&#x2044;&#x20;item
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-semibold uppercase text-lg">
                    {item.prod?.name}
                  </div>
                  <div className="text-md text-gray-500 font-semibold">
                    {item.prod?.price} &euro;&#x20;&#x2044;&#x20;item
                  </div>
                </div>
              )}
              {item.prod?.quantity === 0 ? (
                <div className="text-md text-red-500 font-semibold uppercase">
                  Out of stock
                </div>
              ) : item.prod?.quantity <= 5 ? (
                <div className="text-md text-red-400 font-semibold">
                  Only {item.prod?.quantity} left in stock
                </div>
              ) : (
                <div className="text-md text-gray-500 font-semibold">
                  {item.prod?.quantity} in stock
                </div>
              )}
            </Box>

            <Box className="self-center flex-auto inline-flex justify-end space-x-4">
              <Button
                rounded={"full"}
                bg={"gray.300"}
                _hover={{ bg: "gray.400", color: "white" }}
                className="text-black text-semibold"
                onClick={() => updateQnt(item.id, item.quantity - 1)}
                disabled={checkQntMin(item.quantity, item.prod?.quantity)}
              >
                &#8722;
              </Button>
              {item.prod?.quantity === 0 ? (
                <div className="self-center text-gray-300 font-semibold">
                  {item.quantity}
                </div>
              ) : (
                <div className="self-center font-semibold">{item.quantity}</div>
              )}
              <Button
                rounded={"full"}
                bg={"gray.300"}
                _hover={{ bg: "gray.400", color: "white" }}
                className="text-black align-middle text-semibold"
                onClick={() => updateQnt(item.id, item.quantity + 1)}
                disabled={checkQntMax(item.quantity, item.prod?.quantity)}
              >
                &#43;
              </Button>
            </Box>

            <Box className="self-center grid justify-items-end">
              {item.prod?.quantity === 0 ? (
                <div className="text-2xl md:text-3xl text-gray-300 font-bold">
                  &euro;{" "}
                  {Number.parseFloat(item.prod?.price * item.quantity).toFixed(
                    2
                  )}
                </div>
              ) : (
                <div className="text-2xl md:text-3xl font-bold">
                  &euro;{" "}
                  {Number.parseFloat(item.prod?.price * item.quantity).toFixed(
                    2
                  )}
                </div>
              )}

              <Button
                rounded={"full"}
                bg={"transparent"}
                _hover={{ bg: "red.200", color: "red.700" }}
                className="text-red-600 self-center"
                onClick={() => deleteProductFromCart(item.id)}
              >
                delete
              </Button>
            </Box>
          </Box>

          {/** small screen */}
          <Box
            key={i}
            className="sm:hidden flex flex-col m-2 p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
          >
            {item.prod?.quantity === 0 ? (
              <Box className="flex-auto mb-1">
                <div className="font-semibold text-gray-300 uppercase text-lg">
                  {item.prod?.name}
                </div>
                <div className="text-md text-gray-300 font-semibold">
                  {item.prod?.price} &euro;&#x20;&#x2044;&#x20;item
                </div>
                <div className="text-sm text-red-500 uppercase font-semibold">
                  Out of stock
                </div>
              </Box>
            ) : (
              <Box className="flex-auto mb-1">
                <div className="font-semibold uppercase text-lg">
                  {item.prod?.name}
                </div>
                <div className="text-md text-gray-500 font-semibold">
                  {item.prod?.price} &euro;&#x20;&#x2044;&#x20;item
                </div>
                {item.prod?.quantity <= 5 ? (
                  <div className="text-sm text-red-400 font-semibold">
                    Only {item.prod?.quantity} left in stock
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 font-semibold">
                    {item.prod?.quantity} in stock
                  </div>
                )}
              </Box>
            )}

            <Box className="flex inline-block justify-evenly space-x-10">
              {item.prod?.quantity === 0 ? (
                <Box className="flex-none">
                  <Image
                    boxSize={"8rem"}
                    src={item.prod?.photo === "" ? "/compra.png" : item.prod?.photo}
                    alt={item.prod?.name + " image"}
                    borderRadius="lg"
                    opacity="0.5"
                  />
                </Box>
              ) : (
                <Box className="flex-none">
                  <Image
                    boxSize={"8rem"}
                    src={item.prod?.photo === "" ? "/compra.png" : item.prod?.photo}
                    alt={item.prod?.name + " image"}
                    borderRadius="lg"
                  />
                </Box>
              )}

              <Box className="flex flex-col">
                <Box className="flex items-center flex-auto inline-flex justify-end space-x-4">
                  <Button
                    rounded={"full"}
                    bg={"gray.300"}
                    _hover={{ bg: "gray.400", color: "white" }}
                    className="text-black text-semibold"
                    onClick={() => updateQnt(item.id, item.quantity - 1)}
                    disabled={checkQntMin(item.quantity, item.prod?.quantity)}
                  >
                    &#8722;
                  </Button>
                  {item.prod?.quantity === 0 ? (
                    <div className="self-center text-gray-300 font-semibold">
                      {item.quantity}
                    </div>
                  ) : (
                    <div className="font-semibold self-center">
                      {item.quantity}
                    </div>
                  )}

                  <Button
                    rounded={"full"}
                    bg={"gray.300"}
                    _hover={{ bg: "gray.400", color: "white" }}
                    className="text-black align-middle text-semibold"
                    onClick={() => updateQnt(item.id, item.quantity + 1)}
                    disabled={checkQntMax(item.quantity, item.prod?.quantity)}
                  >
                    &#43;
                  </Button>
                </Box>

                <Box className="grid justify-items-center">
                  {item.prod?.quantity === 0 ? (
                    Number.isInteger(item.prod?.price * item.quantity) ? (
                      <div className="text-2xl font-bold text-gray-300">
                        &euro; {item.prod?.price * item.quantity}.00
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-gray-300">
                        &euro; {item.prod?.price * item.quantity}
                      </div>
                    )
                  ) : Number.isInteger(item.prod?.price * item.quantity) ? (
                    <div className="text-2xl font-bold">
                      &euro; {item.prod?.price * item.quantity}.00
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">
                      &euro; {item.prod?.price * item.quantity}
                    </div>
                  )}
                  <Button
                    rounded={"full"}
                    bg={"transparent"}
                    _hover={{ bg: "red.200", color: "red.700" }}
                    className="text-red-600 "
                    onClick={() => deleteProductFromCart(item.id)}
                  >
                    delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {total > 0 ? (
        <Box className="flex inline-block font-semibold justify-center my-4 space-x-3 sm:space-x-6 sm:justify-end sm:mr-10">
          <Text className="text-md sm:text-lg self-center">Sub-Total</Text>
          <Text className="text-2xl sm:text-3xl self-center">
            &euro; {total.toFixed(2)}
          </Text>
        </Box>
      ) : null}

      {isCartEmpty ? (
        <Box className="font-semibold text-center mt-6 uppercase">
          <Text>
            It seems like there are no items available for purchase here{" "}
            <span>&#9785;</span>
          </Text>
          <Text>Check out the store service!</Text>
        </Box>
      ) : (
        <Box className="flex font-semibold justify-center sm:justify-end sm:mr-10">
          <Button
            bg={"blue.100"}
            paddingX={"3rem"}
            rounded={"xl"}
            _hover={{ bg: "blue.200" }}
            className="uppercase text-center py-4 mr-0 m-2"
            onClick={buy}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartItem;
