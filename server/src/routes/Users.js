const express = require("express");
const User = require("../models/User");
const router = express.Router();

/* GET the list of all Users */
router.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (e) {
    res.json(e);
  }
});

/* GET a specific User */
router.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (e) {
    res.json(e);
  }
});

/* POST to add a user to db */
router.post("/register", async (req, res) => {
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
router.post("/login", (req, res) => {
  res.json({
    message: `Login di ${req.body.email} effettuato!`,
  });
});

module.exports = router;
