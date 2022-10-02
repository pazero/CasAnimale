const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "3600s" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

/* Get user list (optional query) */
router.get("", async (req, res) => {
  try {
    const users = await User.find(req.query);
    res.json(users);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Login user */
router.post("/login", async (req, res) => {
  const user = await User.find(req.body);
  if (user && Object.keys(user).length !== 0 && Object.getPrototypeOf(user) !== Object.prototype) {
    const token = generateAccessToken({ email: req.body.email });
    res.json({
      message: `Login di ${req.body.email} effettuato!`,
      token: `${token}`,
    });
  } else {
    res.json({
      message: `Wrong mail or password.`,
    });
  }
});

/* Restore user's password */
router.post("/restore", (req, res) => {
  res.json({
    message: `Questa è la tua password temporanea: ciao1234!`,
  });
});

/* Get an user by id */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new user */
router.put("/addUser", async (req, res) => {
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    birth: req.body.birth,
    email: req.body.email,
    password: req.body.password,
    favanimal: req.body.favanimal,
  });
  const newUser = await user.save();
  res.json({ message: "Registrazione effettuata con successo!" });
});

/* Delete an user */
router.delete("/:id", async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ _id: req.params.id });
    res.json(removeUser);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update user's personal datas */
router.post("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        surname: req.body.surname,
        birth: req.body.birth,
        email: req.body.email,
        password: req.body.password,
        favanimal: req.body.favanimal,
      }
    );
    res.json(updatedUser);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
