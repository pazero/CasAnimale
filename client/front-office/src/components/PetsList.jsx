import React, { useState, useEffect } from "react";
import PetManage from "../services/PetManage";
import UserManage from "../services/UserManage";
import {
  Image,
  Stack,
  Center,
  Button,
  Box,
  Heading,
  Text,
  Container,
  useToast,
} from "@chakra-ui/react";

const PetsList = () => {
  const [petsList, setPetList] = useState([]);
  const [isPetFull, setIsPetFull] = useState();
  const [userId, setUserId] = useState();
  const [endList, setEnd] = useState();
  const toast = useToast();

  useEffect(() => {
    async function getUserId() {
      var ret = await UserManage.getUser();
      setUserId(ret.data._id);
    }

    async function fetchData() {
      if (userId) {
        const ret = await PetManage.getPets({ owner: userId });
        const ptList = ret.data;
        setPetList(
          await Promise.all(
            ptList.map((item) => {
              setIsPetFull(true);
              return {
                ...item,
              };
            })
          )
        );
      }
    }
    setEnd(true);
    getUserId();

    fetchData();
  }, [userId]);

  async function delPet(id) {
    const ret = await PetManage.deletePet(id);
    if (ret.status.toString() === "200") {
      let newPetList = petsList.filter((p) => p._id !== id);
      setPetList(newPetList);
      toast({
        title: "Pet deleted successfully :(",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed with the removal try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  }

  return (
    <Container maxW="100%">
      <Container maxW={"7xl"} p="15" pt="10">
        <Heading as="h1">Your pets</Heading>
        {isPetFull && endList && petsList.length > 0 ? (
          <Text>
            {petsList.map((item, i) => (
              <Box
                key={i}
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
                >
                  <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="center"
                    marginTop={{ base: "3", sm: "0" }}
                    padding="2"
                    paddingTop="3"
                    paddingRight="0"
                    backgroundColor="gray.50"
                    borderRadius="md"
                  >
                    <Stack direction={["column", "row"]} spacing={6}>
                      <Center>
                        <Image
                          h={"7rem"}
                          w={"7rem"}
                          ml={{ base: "0", sm: "10" }}
                          src={
                            item.photo === ""
                              ? "/f/speciesIcons/" + item.species + ".png"
                              : item.photo
                          }
                        />
                      </Center>
                      <Box w={"20rem"} pl={{ base: 10 }}>
                        <Heading as="h2" marginTop="1">
                          <div>{item.name}</div>
                        </Heading>
                        <Text as="p" marginTop="2" fontSize="lg">
                          <ul>
                            <li>Species: {item.species}</li>
                            <li>Breed: {item.breed}</li>
                            <li>
                              Birth:{" "}
                              {item.birth
                                ? item.birth.substring(5, 7) +
                                  "/" +
                                  item.birth.substring(8, 10) +
                                  "/" +
                                  item.birth.substring(0, 4)
                                : item.birth}
                            </li>
                          </ul>
                        </Text>
                      </Box>
                      <Box align={"center"}>
                        <Button
                          rounded={"full"}
                          mt={{ base: "0", sm: "12" }}
                          mb={{ base: "3", sm: "12" }}
                          bg={"red.400"}
                          _hover={{ bg: "red.500" }}
                          onClick={() => delPet(item._id)}
                        >
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
          <Text>No animals found, add one!</Text>
        )}
      </Container>
    </Container>
  );
};

export default PetsList;
