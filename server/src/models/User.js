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
  is_company: Boolean,
  company_type: String, //vet, vendor, petsitting, general service, private
  // da aggiungere altri campi?
});

module.exports = mongoose.model("User", userSchema);
