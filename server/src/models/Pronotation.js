const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Prenotation schema fields */
const prenotationSchema = new Schema({
    company: Number,  // id company
    start: Date,
    duration: Number,
});

module.exports = mongoose.model("Prenotation", prenotationSchema);