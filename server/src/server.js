const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./api")(app);

app.listen(5000, console.log("Serving on port 5000!"));
