const userRoute = require("./routes/Users");
const postRoute = require("./routes/Post");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });
  app.use("/users", userRoute); /* user routing middleware */
  app.use("/posts", postRoute); /* user routing middleware */
};
