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
} from "@chakra-ui/react";
import {
  Card,
  CardBody,
  Box,
  Divider,
  CardFooter,
  Tag,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Stack, Heading, Text, Button } from "@chakra-ui/react";
import Cookies from "js-cookie";

const Product = (props) => {
  const token = Cookies.get("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const deleteItem = async () => {
    const data = await ProductManage.deleteProduct(props.data._id);
    if (data.status.toString() === "200") {
      document.getElementById(props.data._id).style.display = "none";
      toast({
        title: "Item deleted successfully!",
        status: "success",
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
  };

  async function AddCart() {
    const msg = await ProductManage.updateCart(
      props.data._id,
      document.getElementById("Number" + props.data._id).value
    );
    if (msg.status.toString() === "200") {
      toast({
        title: "Item added to your cart!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed adding the item try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  }

  function outOfStock(qnt) {
    if (qnt === 0) return true;
    else return false;
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update product quantity!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <UpdateProduct
              data={props.data}
              style={{ display: "flex", height: "100%" }}
            />
          </ModalBody>

          <ModalFooter>
            <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
              * required field
            </div>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
                  props.data?.photo === "" || props.data?.photo === undefined
                    ? "/f/compra.png"
                    : props.data.photo
                }
                borderRadius="lg"
                className="w-full object-cover justify-self-center"
                opacity="0.5"
                alt={props.data.name + "product image"}
              />
            ) : (
              <Image
                src={
                  props.data?.photo === "" || props.data?.photo === undefined
                    ? "/f/compra.png"
                    : props.data.photo
                }
                borderRadius="lg"
                className="w-full justify-self-center"
                alt={props.data.name + "product image"}
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
                onClick={onOpen}
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
              <label for={"Number" + props.data._id} className="hidden">
                alter quantity{" "}
              </label>
              <NumberInput
                id={"Number" + props.data._id}
                className="mr-2 rounded grow-0"
                backgroundColor={"white"}
                size="md"
                maxW={24}
                defaultValue={1}
                min={1}
                max={props.data.quantity}
                aria-label={"alter quantity of " + props.data.name}
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
                  if (!token)
                    toast({
                      title: "You must first login",
                      status: "warning",
                      duration: 3000,
                      variant: "subtle",
                    });
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
