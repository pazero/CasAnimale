import React from "react";
import ProductManage from "../services/ProductManage";
import {
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Tag,
} from "@chakra-ui/react";
import { Stack, Heading, Text, Button } from "@chakra-ui/react";

const Product = (props) => {
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

  return (
    <Card
      className="m-2"
      maxW={{ sm: "sm", md: "sm", lg: "md", xl: "md", "2xl": "md" }}
      id={props.data._id}
    >
      <CardBody>
        <Image
          boxSize={{ sm: "300px", md: "350px", lg: "400px", xl: "450px" }}
          src={props.data.photo === "" ? "/f/compra.png" : props.data.photo}
          borderRadius="lg"
        />
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
          <Heading size="lg">{props.data.name}</Heading>
          <Text>{props.data.description}</Text>
          <Text color="blue.600" fontSize="2xl">
            {Number.parseFloat(props.data.price).toFixed(2)} €
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-1">
        <NumberInput
          id={"Number" + props.data._id}
          className="mr-2 rounded"
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
        <Button className="mr-2" onClick={AddCart} colorScheme="twitter">
          Add to cart!
        </Button>
        {props.isUserLoggedPost ? (
          <Button colorScheme="red" onClick={deleteItem}>
            Delete
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default Product;
