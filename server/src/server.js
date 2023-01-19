/* Import packages and inizialize */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// imports the .env file
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "*",
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());
app.use("/back", express.static(__dirname + "/back-office"));
app.use("/front", express.static(__dirname + "/front-office"));
app.use("/game", express.static(__dirname + "/game"));

/* Connect to DB */
mongoose.connect(process.env.DB_CONNECTION);

/* Api routes */
require("./api")(app);

/* Starting point */
app.listen(process.env.PORT, console.log("Serving on port", process.env.PORT));
