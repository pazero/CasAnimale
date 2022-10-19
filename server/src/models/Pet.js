const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const petSchema = new Schema({
    name: String,
    species: String,  // veterinaio, pet sitter, etc...
    owner: Number,    // id of user
});

module.exports = mongoose.model("Pet", petSchema);
