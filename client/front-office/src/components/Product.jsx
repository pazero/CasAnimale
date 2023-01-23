import React, { useState } from "react";
import ProductManage from "../services/ProductManage";
import UpdateProduct from "../components/UpdateProduct";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  Box,
  Divider,
  CardFooter,
  Tag,
} from "@chakra-ui/react";
import { Stack, Heading, Text, Button } from "@chakra-ui/react";
import Cookies from "js-cookie";

const Product = (props) => {
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    const { data: msg } = await ProductManage.deleteProduct(props.data._id);
    alert(msg.message);
    window.location.reload();
  };

  async function AddCart() {
    const msg = await ProductManage.updateCart(
      props.data._id,
      document.getElementById("Number" + props.data._id).value
    );
    alert(msg.data.message);
  }

  function outOfStock(qnt) {
    if (qnt === 0) return true;
    else return false;
  }

  return (
    <div>
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
                  <UpdateProduct
                    data={props.data}
                    style={{ display: "flex", height: "100%" }}
                  />
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

      <Card
        className="grow-0 m-2 items-stretch h-full"
        maxW={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
        id={props.data._id}
      >
        <CardBody>
          <Box className="mx-1.5">
            {props.data.quantity === 0 ? (
              <Image
                src={
                  props.data.photo === "" ? "/f/compra.png" : props.data.photo
                }
                borderRadius="lg"
                className="w-full object-cover justify-self-center"
                opacity="0.5"
              />
            ) : (
              <Image
                src={
                  props.data.photo === "" ? "/f/compra.png" : props.data.photo
                }
                borderRadius="lg"
                className="w-full justify-self-center"
              />
            )}
          </Box>
          <div className="mt-2">
            {props.data.tags?.map((item) => {
              if (item === "vip")
                return (
                  <Tag
                    className="mr-2"
                    size="md"
                    variant="solid"
                    colorScheme="yellow"
                  >
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                          fill="rgba(229,221,0,1)"
                        />
                      </svg>
                      <span className="ml-1">{item}</span>
                    </span>
                  </Tag>
                );
              return (
                <Tag
                  className="mr-2 "
                  size="md"
                  variant="solid"
                  colorScheme="teal"
                >
                  {item}
                </Tag>
              );
            })}
          </div>
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.data.name}</Heading>
            <Text size="sm">{props.data.description}</Text>
            <Text
              fontSize={{ base: "2xl", sm: "3xl" }}
              className="font-semibold"
            >
              &euro; {Number.parseFloat(props.data.price).toFixed(2)}
            </Text>
            {props.data.quantity === 0 ? (
              <Text color="red.500" fontSize="md" className="font-semibold">
                OUT OF STOCK
              </Text>
            ) : props.data.quantity <= 5 ? (
              <Text color="red.400" fontSize="md">
                Only {props.data.quantity} left in stock
              </Text>
            ) : (
              <Text color="gray.400" fontSize="md">
                {props.data.quantity} in stock
              </Text>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter className="flex grow-0">
          {props.isUserLoggedPost ? (
            <Box className="flex justify-evenly w-full">
              <Button
                rightIcon={<EditIcon />}
                rounded={"full"}
                bg={"orange.300"}
                color={"white"}
                _hover={{ bg: "orange.400" }}
                onClick={() => {
                  setShowModal(true);
                }}
                className="text-sm"
              >
                Update qnt
              </Button>
              <Button
                rightIcon={<DeleteIcon />}
                rounded={"full"}
                bg={"red.400"}
                color={"white"}
                _hover={{ bg: "red.500" }}
                onClick={deleteItem}
                className="text-sm"
              >
                Delete item
              </Button>
            </Box>
          ) : (
            <Box className="flex justify-evenly w-full">
              <NumberInput
                id={"Number" + props.data._id}
                className="mr-2 rounded grow-0"
                backgroundColor={"white"}
                size="md"
                maxW={24}
                defaultValue={1}
                min={1}
                max={props.data.quantity}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                rightIcon={<CheckIcon />}
                className="mr-2"
                rounded={"full"}
                bg={"blue.100"}
                _hover={{ bg: "blue.200", color: "black" }}
                onClick={() => {
                  if (!token) alert("You must first login");
                  else AddCart();
                }}
                disabled={outOfStock(props.data.quantity)}
              >
                Add to cart
              </Button>
            </Box>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;
