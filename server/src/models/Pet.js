const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const petSchema = new Schema({
  name: String,
  species: String,
  owner: String, // id of user
});

module.exports = mongoose.model("Pet", petSchema);
