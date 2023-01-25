const userRoute = require("./routes/Users");
const productRoute = require("./routes/Product");
const postRoute = require("./routes/Post");
const petRoute = require("./routes/Pet");
const companyRoute = require("./routes/Company");
const prenotationRoute = require("./routes/Prenotation");
const leaderboardRoute = require("./routes/Leaderboard");
const emailRestoreRoute = require("./routes/EmailRestore");

module.exports = (app) => {
  // test api
  app.get("/hello", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });
  app.use("/api/user", userRoute);                /* user routing middleware        */
  app.use("/api/product", productRoute);          /* product routing middleware     */
  app.use("/api/post", postRoute);                /* post routing middleware        */
  app.use("/api/pets", petRoute);                 /* pet routing middleware         */
  app.use("/api/company", companyRoute);          /* company routing middleware     */
  app.use("/api/prenotation", prenotationRoute);  /* prenotation routing middleware */
  app.use("/api/leaderboard", leaderboardRoute);  /* prenotation routing middleware */
};
