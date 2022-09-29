const express = require("express");
const User = require("../models/User");
const router = express.Router();

/* Get user list (optional query) */
router.get("", async (req, res) => {
  try {
    const users = await User.find(req.query);
    res.json(users);
  } catch (e) {
    res.json({ message: e });
  }
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
  res.json(newUser);
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

/* Login user */
router.post("/login", (req, res) => {
  res.json({
    message: `Login di ${req.body.email} effettuato!`,
  });
});

module.exports = router;
