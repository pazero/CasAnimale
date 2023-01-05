import React, { useState, useEffect } from "react";
import PetManage from "../services/PetManage";
import UserManage from "../services/UserManage";
import { Image, Stack, Flex, Center, Button, Box, Heading, Text, Container } from "@chakra-ui/react";



const PetsList = () => {
  const [petsList, setPetList] = useState([]);
  const [isPetFull, setIsPetFull] = useState();
  const [userId, setUserId] = useState();
  const [endList, setEnd] = useState();


  useEffect(() => {
    console.log("user: " + userId)
  }, [userId])

  useEffect(() => {
    console.log("petsList: " + petsList)
  }, [petsList])

  useEffect(() => {
    async function getUserId() {
      var ret = await UserManage.getUser()
      setUserId(ret.data._id)
      console.log(ret.data._id)
    }

    async function fetchData() {
      const ret = await PetManage.getPets({owner: userId});
      const ptList = ret.data;
      setPetList(
        await Promise.all(
          ptList.map((item) => {    // item = pets
            setIsPetFull(true);
            return {
              ...item,
            };
          })
        )
      );
    }
    setEnd(true);
    getUserId();
    fetchData();
  }, [userId]);

  return (
    <Container maxW="100%">
      <Container maxW={"7xl"} p="15" pt="10" mt="4">
        <Heading as="h1">Your pets</Heading>
        {(isPetFull && endList) ? (
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
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Image h={'7rem'} w={'7rem'} ml={10} src={item.photo} />
                    </Center>
                    <Box w={'20rem'} pl={{ base: 10 }}>
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
                    <Box align={'center'}>
                      <Button
                        rounded={'full'}
                        my={12}
                        mr={6}
                        bg={'red.400'}
                        _hover={{ bg: 'red.500' }}>
                          Delete
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          ))}
        </Text>
        ) : (
          <Text>
            No animals founded, add one!
          </Text>
        )}
      </Container>
    </Container>
  );
};

export default PetsList;
