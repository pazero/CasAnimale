import React, { useState, useEffect } from "react";
import PrenotationManage from "../services/PrenotationManage";
import CompanyManage from "../services/CompanyManage";
import { Box, Heading, Text, Container, Button} from "@chakra-ui/react";

const PrenotationsList = () => {
  const [prenotationsList, setPrenotationsList] = useState([]);
  const [isPrenotationEmpty, setisPrenotationEmpty] = useState();

  useEffect(() => {
    async function fetchData() {
      const ret = await PrenotationManage.getPrenotations();
      const ptList = ret.data;
      setPrenotationsList(
        await Promise.all(
          ptList.map((item) => {
            // item = pet
            // console.log(item);
            setisPrenotationEmpty(true);
            return {
              ...item,
            };
          })
        )
      );
    }
    fetchData();
  }, []);

  async function fetchCompanyName(id) {
    const ret = await CompanyManage.getCompany(id);
    return await Promise.all(ret.data.name);
  }

  return (
    <Container maxW="100%">
      <Container maxW={"7xl"} p="15" pt="10" mt="4">
        <Heading as="h1">Your prenotations</Heading>
        <Text>
          {prenotationsList.map((item, i) => (
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
                alignItems="center"
              >
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="left"
                  marginTop={{ base: "3", sm: "0" }}
                  padding="2"
                  paddingLeft="4"
                  backgroundColor="gray.50"
                  borderRadius="md"
                >
                  <Heading as="h2" marginTop="1">
                    <div>{item.start
                          ? item.start.substring(5, 7) +
                            "/" +
                            item.start.substring(8, 10) +
                            "/" +
                            item.start.substring(0, 4)
                          : item.start}</div>
                  </Heading>
                  <Text as="p" marginTop="2" fontSize="lg">
                    <ul>
                      <li>Company: {}</li>
                      <li>
                        Schedule:{" "}
                        {item.start ? item.start.substring(11, 16) : item.start}
                      </li>
                    </ul>
                  </Text>
              <Button></Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Text>
        {isPrenotationEmpty ? null : <Text>No animals founded, add one!</Text>}
      </Container>
    </Container>
  );
};

export default PrenotationsList;
