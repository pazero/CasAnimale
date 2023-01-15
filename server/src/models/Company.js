const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const companySchema = new Schema({
  name: String,
  photo: String,
  type: String, // veterinaio, pet sitter, etc...
  description: String,
  cost_per_hour: String,
  owner: String,
  cities: [String], // città in cui opera
  business_hours: { start: Number, end: Number },
  email: String,
  password: String,
  main_pets: [String],
  study_info: [String],
  professional_experience: [String],
  actual_jobs: [String],
  photo: String,
});

module.exports = mongoose.model("Company", companySchema);