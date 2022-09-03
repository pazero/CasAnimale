const User = require("./models/User.js");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });

  /* POST to add a user to db */
  app.post("/register", async (req, res) => {
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      birth: req.body.birth,
      email: req.body.email,
      password: req.body.password,
      favanimal: req.body.favanimal,
    });
    const newUser = await user.save();
    res.json(newUser);
  });

  /* POST to login a user */
  app.post("/login", (req, res) => {
    res.json({
      message: `Login di ${req.body.email} effettuato!`,
    });
  });

  /* GET user list */
  app.get("/users", (req, res) => {
    res.json({
      users: ["Fede", "Geno", "Paolo"],
    });
  });
};
