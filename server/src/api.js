const userRoute = require("./routes/Users");
const productRoute = require("./routes/Product");
const postRoute = require("./routes/Post");

module.exports = (app) => {
  // todo: da togliere alla fine
  app.get("/", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });
  app.use("/users", userRoute); /* user routing middleware    */
  app.use("/products", productRoute); /* product routing middleware */
  app.use("/posts", postRoute); /* post routing middleware    */
};
