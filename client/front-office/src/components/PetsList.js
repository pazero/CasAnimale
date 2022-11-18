import React, { useState, useEffect } from "react";
import PetManage from "../services/PetManage";
import { Box, Heading, Text, Container } from "@chakra-ui/react";

const PetsList = () => {
  const [petsList, setPetList] = useState([]);
  const [isPetEmpty, setIsPetEmpty] = useState();

  useEffect(() => {
    async function fetchData() {
      const ret = await PetManage.getPets();
      const ptList = ret.data;
      setPetList(
        await Promise.all(
          ptList.map((item) => {    // item = pet
            console.log(item);
            setIsPetEmpty(true);
            return {
              ...item,
            };
          })
        )
      );
    }
    fetchData();
  }, []);

  return (
    <Container maxW="100%">
      <Container maxW={"7xl"} p="15" pt="10" mt="4">
        <Heading as="h1">Your pets</Heading>
        <Text>
          {petsList.map((item, i) => (
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
                  <Heading as="h2" marginTop="1">
                    <div>{item.name}</div>
                  </Heading>
                  <Text as="p" marginTop="2" fontSize="lg">
                    <ul>
                      <li>Species: {item.species}</li>
                      <li>Breed: {item.breed}</li>
                      <li>Birth: {item.birth
                                  ? item.birth.substring(5, 7) +
                                  "/" +
                                  item.birth.substring(8, 10) +
                                  "/" +
                                  item.birth.substring(0, 4)
                                    : item.birth}</li>
                    </ul>
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Text>
        {isPetEmpty ? null : (
          <Text>
            No animals founded, add one!
          </Text>
        )}
      </Container>
    </Container>
  );
};

export default PetsList;
