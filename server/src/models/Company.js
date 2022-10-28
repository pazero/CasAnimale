const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const companySchema = new Schema({
  name: String,
  type: String, // veterinaio, pet sitter, etc...
  description: String,
  cost_per_hour: String,
  owner: String,
  cities: [String], // città in cui opera
  business_hours: { start: Number, end: Number },
  email: String,
  password: String,
});

module.exports = mongoose.model("Company", companySchema);
