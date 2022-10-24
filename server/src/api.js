const userRoute = require("./routes/Users");
const productRoute = require("./routes/Product");
const postRoute = require("./routes/Post");

module.exports = (app) => {
  // todo: da togliere alla fine
  app.get("/api", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });
  app.use("/api/users", userRoute); /* user routing middleware    */
  app.use("/api/products", productRoute); /* product routing middleware */
  app.use("/api/wposts", postRoute); /* post routing middleware    */
};
