import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import ProductManage from "../services/ProductManage";
import { Box, Heading, Text, Container } from "@chakra-ui/react";

const CartItem = () => {
  const [prodList, setProdList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const ret = await UserManage.getUser();
      const cart = ret.data.cart;
      setProdList(
        await Promise.all(
          cart.map(async (item) => {
            const { data: prod } = await ProductManage.getProduct(item.id);
            setTotal((total) => total + prod.price * item.quantity);
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

  return (
    <Container
      maxW={"7xl"}
      p="10"
      className="m-2 rounded"
      backgroundColor={"lightblue"}
    >
      <Heading as="h1">Cart</Heading>
      <Text>
        {prodList.map((item, i) => (
          <Box
            key={i}
            p="5"
            className="m-2 rounded"
            backgroundColor={"lightgreen"}
          >
            <div className="font-bold">{item.prod.name}</div>
            <div>Quantità: {item.quantity}</div>
            <div>Costo al pezzo {item.prod.price}</div>
            <div>Costo totale: {item.prod.price * item.quantity} </div>
          </Box>
        ))}
      </Text>
      <Text>Prezzo totale: {total.toFixed(2)}</Text>
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
