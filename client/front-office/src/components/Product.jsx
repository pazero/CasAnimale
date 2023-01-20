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

  function outOfStock(qnt) {
    if (qnt == 0)
      return true;
    else
      return false;
  }

  return (
    <Card
      className="grow-0 m-2 self-stretch"
      width={{ sm:"sm", md:"sm", lg:"md", xl:"md"}}
      id={props.data._id}
    >
      <CardBody>
        {props.data.quantity == 0
          ? <Image
              src={(props.data.photo === "") ? "/compra.png" : props.data.photo}
              borderRadius="lg"
              className="w-5/6 justify-self-center lg:w-full"
              opacity="0.5"
            />
          : <Image
              src={(props.data.photo === "") ? "/compra.png" : props.data.photo}
              borderRadius="lg"
              className="w-5/6 justify-self-center sm:w-full"
            />}
        <div className="mt-2">
          {props.data.tags?.map((item) => (
            <Tag className="mr-2 " size="md" variant="solid" colorScheme="teal">
              {item}
            </Tag>
          ))}
        </div>
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.data.name}</Heading>
          <Text size="sm">{props.data.description}</Text>
          <Text fontSize={{base:"2xl", sm:"3xl"}} className="font-semibold">
            &euro; {Number.parseFloat(props.data.price).toFixed(2)}
          </Text>
          {props.data.quantity == 0
            ? <Text color="red.500" fontSize="md" className="font-semibold">
              OUT OF STOCK
            </Text>
            : props.data.quantity <= 5
              ? <Text color="red.400" fontSize="md">
                Only {props.data.quantity} left in stock
              </Text>
              : <Text color="gray.400" fontSize="md">
                {props.data.quantity} in stock
              </Text>
          }
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter className="flex grow-0">
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
        <Button
          className="mr-2"
          rounded={"full"}
          bg={"blue.100"}
          _hover={{ bg: "blue.200", color: "black" }}
          onClick={AddCart}
          disabled={outOfStock(props.data.quantity)}
        >
          Add to cart!
        </Button>
        {props.isUserLoggedPost ? (
          <Button
            rounded={"full"}
            bg={"red.400"}
            color={"white"}
            _hover={{ bg: "red.500" }}
            onClick={deleteItem}
          >
            Delete item
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default Product;