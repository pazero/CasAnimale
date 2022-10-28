import React from "react";
import { Box, Heading, Text, Badge } from "@chakra-ui/react";

const Company = (props) => {
  return (
    <Box
      id={props.id}
      className="p-2 m-2 rounded"
      backgroundColor={"lightblue"}
    >
      <Heading as="h2">{props.name}</Heading>
      <Text>
        Description:
        <br />
        {props.description}
      </Text>
      <Badge className="m-2" colorScheme={"red"} fontSize={"md"}>
        {props.cost_per_hour} € / h
      </Badge>
      <Text>{props.owner}</Text>
      <Text>Opening hour {props.business_hours.start}</Text>
      <Text>Closing hour 2{props.business_hours.end}</Text>
      <Text>Cities:</Text>
      <ul>
        {props.cities.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Company;
