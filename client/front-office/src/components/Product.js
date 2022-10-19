import React, { Component } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Box, Heading, Text, Button, Badge } from "@chakra-ui/react";

class Product extends Component {
  render() {
    return (
      <Box className="p-2 m-2 rounded" backgroundColor={"lightblue"}>
        <Heading as="h2">{this.props.title}</Heading>
        <Text>{this.props.description}</Text>
        <Badge className="m-2" colorScheme={"red"} fontSize={"md"}>{this.props.price} €</Badge>
        <div className="flex flex-1">
        <NumberInput className="mr-2 rounded" backgroundColor={"white"} size="md" maxW={24} defaultValue={0} min={0} max={this.props.quantity}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button>Add to chart!</Button>
        </div>
      </Box>
    );
  }
}

export default Product;
