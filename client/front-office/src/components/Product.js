import React from "react";
import ProductManage from "../services/ProductManage";
import {
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Box, Heading, Text, Button, Badge } from "@chakra-ui/react";

const Product = (props) => {
  async function AddCart() {
    const msg = await ProductManage.updateCart(
      props.id,
      document.getElementById("Number" + props.id).value
    );
    alert(msg.data.message);
  }

  return (
    <Box
      id={props.id}
      className="p-2 m-2 rounded"
      backgroundColor={"lightblue"}
    >
      <Heading as="h2">{props.title}</Heading>
      <Text>{props.description}</Text>
      <Image src={props.photo} boxSize={"auto"} />
      <Badge className="m-2" colorScheme={"red"} fontSize={"md"}>
        {props.price} €
      </Badge>
      <div className="flex flex-1">
        <NumberInput
          id={"Number" + props.id}
          className="mr-2 rounded"
          backgroundColor={"white"}
          size="md"
          maxW={24}
          defaultValue={1}
          min={1}
          max={props.quantity}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={AddCart}>Add to cart!</Button>
      </div>
    </Box>
  );
};

export default Product;
