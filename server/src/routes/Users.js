const express = require("express");
const User = require("../models/User");
const router = express.Router();

/* GET the list of all Users */
router.get("/getAllUsers", async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (e) {
    res.json({ message: e });
  }
});

/* GET a specific User */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
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

/* DELETE an user */
router.delete("/:id", async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ _id: req.params.id });
    res.json(removeUser);
  } catch (e) {
    res.json({ message: e });
  }
});

/* UPDATE an user's personal data */
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        surname: req.body.surname,
        birth: req.body.birth,
        email: req.body.email,
        password: req.body.password,
        favanimal: req.body.favanimal
      }
    );
    res.json(updatedUser);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
