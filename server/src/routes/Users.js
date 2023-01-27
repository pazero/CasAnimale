const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Receipt = require("../models/Receipt");
const jwt = require("../services/jwtUtils");
const router = express.Router();

const VIPFee = 15; // each month

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
  try {
    if (req.body.email && req.body.password) {
      const user = await User.find(req.body);
      if (
        user &&
        Object.keys(user).length !== 0 &&
        Object.getPrototypeOf(user) !== Object.prototype
      ) {
        const token = jwt.generateAccessToken({ id: user[0]._id });
        res.cookie("token", token, {
          path: "/",
          maxAge: 2 * 60 * 60 * 1000,
        });
        res.json({
          message: `Login of ${req.body.email} done!`,
          success: true,
        });
      } else {
        res.json({
          message: `Wrong mail or password.`,
          success: false,
        });
      }
    } else {
      res.json({
        message: `You must enter a password or an email`,
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/isLoggedIn", (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    function cont() {
      res.json({ message: "user is logged", success: true });
    }
  } catch (e) {
    console.log(e);
  }
});

/* Restore user's password */
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
        if (product.quantity != 0) {
          const remain = product.quantity - item.quantity;
          await Product.findOneAndUpdate(
            { _id: item.id },
            {
              quantity: remain,
            }
          );
          userCart.splice(n, 1);
        }

        // create receipt
        const r = new Receipt({
          timestamp: new Date(),
          type: "ecommerce",
          description: product.name + " receipt",
          amount: product.price * item.quantity,
          receiver: product.seller,
          giver: req.userid,
        });
        await r.save();
      }
      await User.findOneAndUpdate(
        { _id: req.userid },
        {
          cart: userCart,
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
    vip: false,
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

router.post("/enableVip", (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await User.findOneAndUpdate(
        { _id: req.userid },
        {
          vip: true,
        }
      );
      res.json({ message: "You are now a VIP user!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

router.post("/disableVip", (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await User.findOneAndUpdate(
        { _id: req.userid },
        {
          vip: false,
        }
      );
      res.json({ message: "You are now a NORMAL user!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
