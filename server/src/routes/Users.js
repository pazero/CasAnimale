const express = require("express");
const User = require("../models/User");
const router = express.Router();

/* ATTENZIONE: seguire l'architettura CRUD */

/* Get the list of all Users */
router.get("/getAllUsers", async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get user list with a query */
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find(req.query);
    res.json(users);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get a specific User */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

// da controllare: usare PUT o POST
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

// da controllare: usare PUT o POST
/* Update user's personal datas */
router.put("/:id", async (req, res) => {
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
