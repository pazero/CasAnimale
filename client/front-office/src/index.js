import ReactDOM from "react-dom";
import App from "./App";
import "./output.css";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.querySelector("#root")
);
