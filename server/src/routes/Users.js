const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require("../services/jwrUtils");
const router = express.Router();

/* TODO: remove later on, temporary  query for debugging */
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
  if (
    user &&
    Object.keys(user).length !== 0 &&
    Object.getPrototypeOf(user) !== Object.prototype
  ) {
    const token = jwt.generateAccessToken({ id: user[0]._id });
    res.json({
      message: `Login of ${req.body.email} done!`,
      token: `${token}`,
    });
  } else {
    res.json({
      message: `Wrong mail or password.`,
    });
  }
});

/* TODO: prendere o lasciare? Restore user's password */
router.post("/restore", (req, res) => {
  res.json({
    message: `Questa è la tua password temporanea: ciao1234!`,
  });
});

/* Get an user's information (with email and paswd) */
router.get("/getInfo", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const user = await User.findById(req.userid);
      res.json(user);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get an user's information (without email and paswd) */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      photo: user.photo,
      favanimal: user.favanimal,
    });
  } catch (e) {
    res.json({ message: e });
  }
});

/* Buy things in user's cart */
router.post("/cart/buy", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const user = await User.findById(req.userid);
      const userCart = user.cart;
      for (const [n, item] of Object.entries(userCart)) {
        const product = await Product.findById(item.id);
        const remain = product.quantity - item.quantity;
        if (remain <= 0) {
          await Product.deleteOne({ _id: item.id });
        } else {
          await Product.findOneAndUpdate(
            { _id: item.id },
            {
              quantity: remain,
            }
          );
        }
      }
      await User.findOneAndUpdate(
        { _id: req.userid },
        {
          cart: [],
        }
      );
      res.json({ message: "You just boght everything" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new user */
router.put("/new", async (req, res) => {
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    photo: req.body.photo,
    birth: req.body.birth,
    email: req.body.email,
    password: req.body.password,
    favanimal: req.body.favanimal,
    petOwned: req.body.petOwned,
    cart: [],
  });
  await user.save();
  res.json({ message: "Registrazione effettuata con successo!" });
});

/* Delete an user */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const removeUser = await User.deleteOne({ _id: req.params.id });
      res.json(removeUser);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update user's personal datas */
router.post("/update", async (req, res) => {
  try {
    console.log("ciao",req)
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await User.findOneAndUpdate(
        { _id: req.userid },
        {
          name: req.body.name,
          surname: req.body.surname,
          photo: req.body.photo,
          birth: req.body.birth,
          email: req.body.email,
          password: req.body.password,
          favanimal: req.body.favanimal,
        }
      );
      res.json({ message: "Update done!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
