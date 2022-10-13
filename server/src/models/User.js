const mongoose = require("mongoose");
const { Schema } = mongoose;

/* User schema fields */
const userSchema = new Schema({
  name: String,
  surname: String,
  birth: Date,
  email: String,
  password: String,
  favanimal: String,
  company: Number,   // id company
});

module.exports = mongoose.model("User", userSchema);
