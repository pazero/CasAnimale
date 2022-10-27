const userRoute = require("./routes/Users");
const productRoute = require("./routes/Product");
const postRoute = require("./routes/Post");
const petRoute = require("./routes/Pet");
const companyRoute = require("./routes/Company");
const prenotationRoute = require("./routes/Prenotation");

module.exports = (app) => {
  // todo: da togliere alla fine
  app.get("/api", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });
  app.use("/api/users", userRoute);                       /* user routing middleware        */
  app.use("/api/products", productRoute);                 /* product routing middleware     */
  app.use("/api/posts", postRoute);                       /* post routing middleware        */
  app.use("/api/pet", petRoute);                          /* pet routing middleware         */
  app.use("/api/company", companyRoute);                  /* company routing middleware     */
  app.use("/api/prenotation/:company", prenotationRoute); /* prenotation routing middleware */
};
