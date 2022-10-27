import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import ProductManage from "../services/ProductManage";
import { Box, Heading, Text, Container, Button } from "@chakra-ui/react";

async function buy() {
  const msg = await UserManage.buyUserCart();
  alert(msg.data.message);
}

async function deleteProductFromCart(id) {
  const msg = await ProductManage.updateCart(id, 0);
  alert(msg.data.message);
  window.location.reload();
}

const CartItem = () => {
  const [prodList, setProdList] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
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
            setIsCartEmpty(false);
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
            <Button colorScheme="red" onClick={() => deleteProductFromCart(item.id)}>Elimina</Button>
          </Box>
        ))}
      </Text>
      <Text>Prezzo totale: {total.toFixed(2)}</Text>
      {isCartEmpty ? null : (
        <Button colorScheme="blue" onClick={buy}>
          Compra!
        </Button>
      )}
    </Container>
  );
};

export default CartItem;
