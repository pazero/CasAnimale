import ReactDOM from "react-dom";
import App from "./App";
import "./output.css"
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.querySelector("#root")
);
