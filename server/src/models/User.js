const mongoose = require("mongoose");
const { Schema } = mongoose;

/* User schema fields */
const userSchema = new Schema({
  name: String,
  surname: String,
  birth: Date,
  email: String,
  password: String,
  favanimal: [String],
  cart: [{ id: String, quantity: Number }], // product's id and quantity
});

module.exports = mongoose.model("User", userSchema);
