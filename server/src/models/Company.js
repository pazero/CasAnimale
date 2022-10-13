const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const companySchema = new Schema({
  name: String,
  type: String,  // veterinatio, pet sitter, etc...
  description: String,
  cost_per_hour: String,
  owner: Number, // id of user
  prenotation: [Number],
});

module.exports = mongoose.model("Company", companySchema);
