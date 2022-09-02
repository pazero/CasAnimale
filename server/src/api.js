module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Questo è un server express",
    });
  });

  /* POST to add a user to db */
  app.post("/register", (req, res) => {
    res.json({
      message: `Registrazione di ${req.body.email} effettuata!`,
    });
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
