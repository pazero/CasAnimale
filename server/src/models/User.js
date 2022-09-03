const mongoose = require("mongoose");
const { Schema } = mongoose;

/* User schema fields */
const userSchema = new Schema({
  name: String,
  surname: String,
  birth: String, // da cambiare in Date
  email: String,
  password: String,
  favanimal: String,
  // da aggiungere altri campi?
});

module.exports = mongoose.model("User", userSchema);
