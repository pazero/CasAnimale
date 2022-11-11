const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");
const jwt = require("../services/jwrUtils");
const router = express.Router();

/* Get all products */
router.get("", async (req, res) => {
  try {
    const products = await Product.find(req.query);
    res.json(products);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get a product by id */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new product */
router.put("/new", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const product = new Product({
        name: req.body.name,
        photo: req.body.photo,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        seller: req.userid,
      });
      await product.save();
      res.json({ message: "New product created!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Delete a product */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const removedProd = await Product.findById(req.params.id);
      if (req.userid == removedProd.seller) {
        // TODO da testare
        const msg = await Product.deleteOne(removedProd);
        res.json(msg);
      }
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update product's personal datas */
router.post("/update", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await Product.findOneAndUpdate(
        { _id: req.body.prod_id }, // todo: attenzione, inserire prod_id nel body della richiesta
        {
          name: req.body.name,
          photo: req.body.photo,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          seller: req.body.seller,
        }
      );
      res.json({ message: "Update done!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Add/remove/update a product to user's cart */
router.post("/updateCart/:id/:quantity", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      var user = await User.find({ _id: req.userid });
      var alreadyExist = false;
      user = user[0];
      if (user.cart == undefined) {
        user.cart = [];
      }
      user.cart.forEach((value, i) => {
        if (value.id == req.params.id) {
          alreadyExist = true;
          if (req.params.quantity == 0) {
            user.cart.splice(i, 1);
          } else {
            user.cart[i].quantity = req.params.quantity;
          }
        }
      });
      if (!alreadyExist && req.params.quantity != 0) {
        user.cart.push({ id: req.params.id, quantity: req.params.quantity });
      }
      await User.findOneAndUpdate(
        { _id: req.userid }, // todo: attenzione, inserire prod_id nel body della richiesta
        { cart: user.cart }
      );
      res.json({ message: "Update done!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
