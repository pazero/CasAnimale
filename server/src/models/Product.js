const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Product schema fields */
const productSchema = new Schema({
  name: String,
  image: String,
  description: String,
  price: String,
  quantity: Number,
  seller: String, // id of the user
});

module.exports = mongoose.model("Product", productSchema);
