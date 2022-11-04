const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const petSchema = new Schema({
    name: String,
    species: String,
    breed: String,     // razza (può essere NULL)
    birth: Date,
    owner: Number,    // id of user
});

module.exports = mongoose.model("Pet", petSchema);
