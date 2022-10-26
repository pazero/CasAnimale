import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import ProductManage from "../services/ProductManage";
import { Box, Heading, Text, HStack, Container } from "@chakra-ui/react";

const CartItem = () => {
  const [cart, setCart] = useState([]);
  var prodList = [];
  var total = 0;

  useEffect(() => {
    async function fetchCart() {
      const ret = await UserManage.getUser();
      const cart = ret.data.cart;
      setCart(cart);
    }
    async function fetchItems() {
      cart.forEach(async (el) => {
        const prod = await ProductManage.getProduct(el.id);
        prodList.push(prod.data);
        total += prod.data.price * el.quantity;
      });
    }
    fetchCart().then(fetchItems()).then(console.log(prodList));
  }, []);

  return (
    <Container maxW={"7xl"} p="12" pt="0">
      <Heading as="h1">Cart</Heading>
      <Text>
        {prodList.forEach((item, i) => (
          <div>
            <div>Nome: {item.name}</div>
            <div>Quantità: {cart[i].quantity} </div>
          </div>
        ))}
      </Text>
      <Text>Prezzo totale: {total}</Text>
    </Container>
  );
};

export default CartItem;

/*

<Container maxW={"7xl"} p="12" pt="0">
        <Heading as="h1">Posts</Heading>
        {posts.map((post) => (
          <Box
            key={post._id}
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: "3", sm: "0" }}
                padding="2"
                paddingLeft="4"
                backgroundColor="gray.50"
                borderRadius="md"
              >
                <Heading marginTop="1">
                  <div>{post.title}</div>
                </Heading>
                <Text as="p" marginTop="2" fontSize="lg">
                  <div>{post.description}</div>
                </Text>
                <HStack
                  marginTop="2"
                  spacing="2"
                  display="flex"
                  alignItems="center"
                >
                  <Text fontWeight="medium">
                    {post.author.name} {post.author.surname}
                  </Text>
                  <Text>—</Text>
                  <Text>{post.date}</Text>
                </HStack>
              </Box>
            </Box>
          </Box>
        ))}
      </Container>
    </Container>

*/
