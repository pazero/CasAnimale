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
          src={props.data.photo}
          borderRadius="lg"
        />
        <div className="mt-2">
          {props.data.tags?.map((item) => (
            <Tag className="mr-2 " size="md" variant="solid" colorScheme="teal">
              {item}
            </Tag>
          ))}
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
