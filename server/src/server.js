/* Import packages and inizialize */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// imports the .env file
require("dotenv").config(); 

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.static(__dirname + "/back-office"));

/* Connect to DB */
mongoose.connect(process.env.DB_CONNECTION);

/* Api routes */
require("./api")(app);

/* Starting point */
app.listen(process.env.PORT, console.log("Serving on port", process.env.PORT));
