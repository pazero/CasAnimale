const express = require("express");
const Product = require("../models/Product");
const jwt = require("../services/jwrUtils");
const router = express.Router();

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
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new user */
router.put("/newProduct", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    seller: req.body.seller,
  });
  await product.save();
  res.json({ message: "New product created!" });
});

/* Delete a product */
router.delete("/:id", async (req, res) => {
  try {
    const removeProduct = await Product.deleteOne({ _id: req.params.id });
    res.json(removeProduct);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update product's personal datas */
router.post("/update", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await User.findOneAndUpdate(
        { _id: req.body.prod_id }, // attenzione: inserire prod_id nel body della richiesta
        {
          name: req.body.name,
          image: req.body.image,
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

module.exports = router;
