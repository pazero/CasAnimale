/* Import packages and inizialize */
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const mongoose = require("mongoose");
// imports the .env file
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());

/* Route to static frontend apps, uncomment on producion */
app.use("/b", express.static(path.join(__dirname, "../../client/back-office")));
//app.use(
//  "/f/",
//  express.static(path.join(__dirname, "../../client/front-office/build"))
//);
//app.get("/f/*", async (_, res) =>
//  res.end(
//    await fs.readFile(
//      path.join(__dirname, "../../client/front-office/build/index.html")
//    )
//  )
//);
//app.use("/g/", express.static(path.join(__dirname, "../../client/game/dist")));
//app.get("/g/*", async (_, res) =>
//  res.end(
//    await fs.readFile(path.join(__dirname, "../../client/game/dist/index.html"))
//  )
//);

/* Connect to DB */
mongoose.connect(process.env.DB_CONNECTION);

/* Api routes */
require("./api")(app);

/* Starting point */
app.listen(process.env.PORT, console.log("Serving on port", process.env.PORT));
