import { createRoot } from "react-dom/client";
import App from "./App";
import "./output.css";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.querySelector("#root");
const root = createRoot(container);
console.log("Ciaone")
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
