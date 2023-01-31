import React, { useState, useEffect, startTransition } from "react";
import PrenotationManage from "../services/PrenotationManage";
import UserManage from "../services/UserManage";
import CompanyManage from "../services/CompanyManage";
import vetclinic from "../assets/vet-clinic.png";
import {
  Box,
  Heading,
  Text,
  Container,
  Button,
  Stack,
  Center,
  Image,
} from "@chakra-ui/react";

const PrenotationsList = () => {
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var usr = await UserManage.getUser();
      const ret = await PrenotationManage.getPrenotations({
        user: usr.data._id,
      });

      const ptList = ret.data;

      ptList.sort(function (a, b) {
        var keyA = new Date(a.start),
          keyB = new Date(b.start);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      const com = await CompanyManage.getCompanies();
      const cnList = com.data;
      assoc(ptList, cnList);
    }
    fetchData();
  }, []);

  function assoc(ptList, cnList) {
    let array = [];
    let id = "";
    ptList.forEach((item) => {
      id = item.company;
      if (new Date(item.start).getTime() > new Date().getTime()) {
        cnList.forEach((company) => {
          if (id === company._id) {
            array.push({
              company: company.name,
              photo: company.photo,
              prenotation: item,
            });
          }
        });
      }
    });
    setCompleteList(array);
  }

  async function deletePrenotation(prenotation) {
    const ret = await PrenotationManage.deletePrenotation(prenotation);
    alert(ret.data.message);
    window.location.reload();
  }

  //aggiungiamo +1 perché nel database sono salvate GMT 0 ma noi siamo +1
  function calcTime(time) {
    let start_hours;
    let end_hours;
    if(+time + 1 === 12) start_hours = "12pm"
    else {
      if(+time + 1 === 0) start_hours = "12am"
      else start_hours = +time + 1 > 12 ? ((+time + 1) % 12) + "pm" : +time + 1 + "am";
    }
    if(+time + 2 === 12) end_hours = "12pm"
    else {
      if(+time + 2 === 0) end_hours = "12am"
      else end_hours = +time + 2 > 12 ? ((+time + 2) % 12) + "pm" : +time + 2 + "am";
    }
    return start_hours + " - " + end_hours;
  }

  return (
    <Container maxW="100%">
      <Container maxW={"7xl"} p="15" pt="10" mt="4">
        <Heading as="h1" className="mt-4">
          Your prenotations
        </Heading>
        {completeList.length > 0 ? (
          <Text>
            {completeList.map((item, i) => {
              return (
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
                      <Stack direction={["column", "row"]} spacing={6}>
                        <Center>
                          <Image
                            ml={{ base: "0", sm: "10" }}
                            src={
                              item.photo !== undefined ? item.photo : vetclinic
                            }
                            className="rounded-full"
                            resizemode="cover"
                            style={{
                              aspectRatio: 1,
                              height: "7rem",
                              width: "7rem",
                            }}
                          />
                        </Center>
                        <Box w={"20rem"} pl={{ base: 10 }}>
                          <Heading as="h2" marginTop="1">
                            <div>
                              {item.prenotation.start
                                ? item.prenotation.start.substring(5, 7) +
                                  "/" +
                                  item.prenotation.start.substring(8, 10) +
                                  "/" +
                                  item.prenotation.start.substring(0, 4)
                                : item.prenotation.start}
                            </div>
                          </Heading>
                          <Text as="p" marginTop="2" fontSize="lg">
                            <ul>
                              <li>
                                Company:{" "}
                                <span className="font-bold">
                                  {item.company}
                                </span>
                              </li>
                              <li>
                                Schedule:{" "}
                                <span className="font-bold">
                                  {calcTime(
                                    item.prenotation.start?.substring(11, 13)
                                  )}
                                </span>
                              </li>
                              {item.prenotation.place === "online" ? (
                                <li>
                                  <Button
                                    colorScheme="red"
                                    onClick={() => {
                                      window.location.href =
                                        `https://meet.jit.si/` +
                                        item.company.replace(/\s/g, "");
                                    }}
                                  >
                                    Videochat link
                                  </Button>
                                </li>
                              ) : (
                                <li>Place: {item.prenotation.place}</li>
                              )}
                            </ul>
                          </Text>
                        </Box>
                        <Stack>
                          {/*<Box className="flex items-end flex-1" style={{ alignItems: "flex-end" }}>*/}
                          <Box>
                            <Button
                              rounded={"full"}
                              mt={{ base: "0", sm: "12" }}
                              mb={{ base: "3", sm: "12" }}
                              bg={"red.400"}
                              _hover={{ bg: "red.500" }}
                              onClick={() =>
                                deletePrenotation(item.prenotation._id)
                              }
                            >
                              Delete
                            </Button>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Text>
        ) : (
          <Text>No appointment found, book one!</Text>
        )}
      </Container>
    </Container>
  );
};

export default PrenotationsList;
