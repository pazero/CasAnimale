const userRoute = require("./routes/Users");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });
  app.use("/user", userRoute); /* user routing middleware */
};
