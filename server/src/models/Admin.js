const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Admin schema fields */
const adminSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    until: Date,
});

module.exports = mongoose.model("Admin", adminSchema);
