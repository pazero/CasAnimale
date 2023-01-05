import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Badge } from "@chakra-ui/react";

const Company = (props) => {
  const navigate = useNavigate();
  return (
    <div id={props.data._id} class="flex p-2 m-2 rounded" style={{border:"solid blue"}} > {props.data.name}</div>
  );
};

export default Company;

/*return (
    <Box
      id={props.data._id}
      className="p-2 m-2 rounded"
      backgroundColor={"lightblue"}
    >
      <Heading as="h2">{props.data.name}</Heading>
      <Text>
        Description:
        <br />
        {props.data.description}
      </Text>
      <Badge className="m-2" colorScheme={"red"} fontSize={"md"}>
        {props.data.cost_per_hour} € / h
      </Badge>
      <Text>{props.data.owner}</Text>
      <Text>Opening hour {props.data.business_hours.start}</Text>
      <Text>Closing hour {props.data.business_hours.end}</Text>
      <Text>Cities:</Text>
      <ul>
        {props.data.cities.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <button className="btn btn-secondary m-2"  onClick={() => {navigate("/specialistpage/"+props.data._id);}}>
        More info
      </button>
    </Box>
  );*/