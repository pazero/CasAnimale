import React, { useState, useEffect } from "react";
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
import { getTime } from "date-fns";

const PrenotationsList = () => {
  const [prenotationsList, setPrenotationsList] = useState([]);
  const [isPrenotationFull, setisPrenotationFull] = useState();
  const [userId, setUserId] = useState();
  const [endList, setEnd] = useState();
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    async function getUserId() {
      var ret = await UserManage.getUser();
      setUserId(ret.data._id);
    }

    async function fetchData() {
      const ret = await PrenotationManage.getPrenotations({ owner: userId });
      const ptList = ret.data;
      ptList.sort(function (a, b) {
        var keyA = new Date(a.start),
          keyB = new Date(b.start);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      setPrenotationsList(
        await Promise.all(
          ptList.map((item) => {
            setisPrenotationFull(true);
            return {
              ...item,
            };
          })
        )
      );

      const com = await CompanyManage.getCompanies();
      const cnList = com.data;
      assoc(cnList);
    }
    setEnd(true);
    getUserId();
    fetchData();
  }, [userId]);

  function assoc(cnList) {
    let ptList = prenotationsList;
    let array = [];
    let id = "";
    ptList.map((item) => {
      id = item.company;
      if (new Date(item.start).getTime() > new Date().getTime()) {
        cnList.map((company) => {
          if (id === company._id) {
            array.push({
              company: company.name,
              photo: company.photo,
              prenotation: item,
            });
          }
        });
      } else {
        deleteOld(item._id);
      }
    });
    setCompleteList(array);
  }
  async function deleteOld(prenotation) {
    const ret = await PrenotationManage.deletePrenotation(prenotation);
  }
  async function deletePrenotation(prenotation) {
    const ret = await PrenotationManage.deletePrenotation(prenotation);
    alert(ret.data.message);
    window.location.reload();
  }

  //aggiungiamo +1 perché nel database sono salvate GMT 0 ma noi siamo +1
  function calcTime(time) {
    let start_hours =
      +time + 1 > 12 ? ((+time + 1) % 12) + "pm" : +time + 1 + "am";
    let end_hours =
      +time + 2 > 12 ? ((+time + 2) % 12) + "pm" : +time + 2 + "am";
    return start_hours + " - " + end_hours;
  }
  return (
    <Container maxW="100%">
      <Container maxW={"7xl"} p="15" pt="10" mt="4">
        <Heading as="h1">Your prenotations</Heading>
        {isPrenotationFull && endList ? (
          <Text>
            {completeList.map((item, i) => (
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
                          resizeMode="cover"
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
                            <li>Company: {item.company}</li>
                            <li>
                              Schedule:{" "}
                              {calcTime(
                                item.prenotation.start?.substring(11, 13)
                              )}
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
                          onClick={() =>
                            deletePrenotation(item.prenotation._id)
                          }
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
          <Text>No appointment founded, book one!</Text>
        )}
      </Container>
    </Container>
  );
};

export default PrenotationsList;

/*
<Heading as="h2" marginTop="1">
                    <div>
                      {item.start
                        ? item.start.substring(5, 7) +
                          "/" +
                          item.start.substring(8, 10) +
                          "/" +
                          item.start.substring(0, 4)
                        : item.start}
                    </div>
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
                </Box>
                <Box align={"center"}>
                  <Button
                    rounded={"full"}
                    mt={{ base: "0", sm: "12" }}
                    mb={{ base: "3", sm: "12" }}
                    bg={"red.400"}
                    _hover={{ bg: "red.500" }}
                  >
                    Delete
                  </Button>
                </Box>*/
