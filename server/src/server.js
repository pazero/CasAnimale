/* Import packages and inizialize */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // this line imports .env file

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.static(__dirname + "/back-office"));

/* Connect to DB */
mongoose.connect(process.env.DB_CONNECTION);

/* Api routes */
require("./api")(app);

/* Starting point */
app.listen(process.env.PORT, console.log("Serving on port", process.env.PORT));
