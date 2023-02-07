import React, { useState, useEffect } from "react";
import BoardManage from "../services/BoardManage";
import UserManage from "../services/UserManage";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Container,
  Card,
  Image,
  Stack,
  Text,
  CardBody,
} from "@chakra-ui/react";

function compare(a, b) {
  if (a.points < b.points) {
    return 1;
  }
  if (a.points > b.points) {
    return -1;
  }
  return 0;
}

const Board = () => {
  const [Board, setBoard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ret = await BoardManage.getBoard();
      const data = ret.data;
      setBoard(
        await Promise.all(
          data.map(async (item) => {
            item.scores = await Promise.all(
              item.scores.map(async (d) => {
                if (d.userid !== "") {
                  var { data: user } = await UserManage.getUser(d.userid);
                  d["user"] = user;
                }
                return d;
              })
            );
            return item;
          })
        )
      );
    }
    fetchData();
  }, []);

  return (
    <Container maxW={"2xl"} p="10" className="m-2 rounded">
      <Heading className="mb-2">Game boards</Heading>
      <Tabs variant="enclosed" colorScheme="green">
        <TabList>
          {Board.map((item, k) => (
            <Tab id={k}>{item.game}</Tab>
          ))}
        </TabList>
        <TabPanels className="border rounded-b-lg">
          {Board.map((item, k) => {
            var board = item.scores;
            return (
              <TabPanel id={k}>
                {board.sort(compare).map((score, k) => {
                  var imgsrc =
                    "https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_questions-128.png";
                  var name = score.name;
                  if (score.userid !== "") {
                    imgsrc =
                      score.user?.photo === "" ||
                      score.user?.photo === undefined
                        ? "/f/userIcon.svg"
                        : score.user?.photo;
                    name = score.user?.name + " " + score.user?.surname;
                  }
                  return (
                    <Card
                      id={k}
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                      className={"p-2 mb-2"}
                    >
                      <Image
                        borderRadius="full"
                        boxSize="100px"
                        src={imgsrc}
                        alt={name + " propic"}
                      />
                      <Stack>
                        <CardBody>
                          <Heading size="md">{name}</Heading>
                          <Text py="2">Points: {score.points}</Text>
                        </CardBody>
                      </Stack>
                    </Card>
                  );
                })}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Board;
