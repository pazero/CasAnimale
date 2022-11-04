import React, { useState, useEffect } from "react";
import UserManage from "../services/UserManage";
import PetManage from "../services/PetManage";
import { Box, Heading, Text, HStack, Container } from "@chakra-ui/react";

const PetsList = () => {
  const [pets, setPetList] = useState([]);
  const [isPetEmpty, setIsPetEmpty] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const ret = await UserManage.getUser();
      const pet = ret.data.pet;
      setPetList(
        await Promise.all(
          pet.map(async (item) => {
            const { data: prod } = await PetManage.getPet(item.id);
            setIsPetEmpty(false);
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
    <Container maxW="100%">
      <Container maxW={"7xl"} p="12" pt="0">
        <Heading as="h1">Pets</Heading>
        <Text>
          {pets.map((item, i) => (
            <Box
              key = {i}
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
                    <div>{item.name}</div>
                  </Heading>
                  <Text as="p" marginTop="2" fontSize="lg">
                    <ul>
                      <li>Species: {item.species}</li>
                      <li>Breed: {item.breed}</li>
                      <li>Birth: {item.birth}</li>
                    </ul>
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Text>
        {isPetEmpty ? null : (
          <Text>
            No animals founded!
          </Text>
        )}
      </Container>
    </Container>
  );
};

export default PetsList;
