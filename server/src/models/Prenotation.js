const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Prenotation schema fields */
const prenotationSchema = new Schema({
  company: String, // id company
  place: String, // presence or online
  start: Date,
  claimed: Boolean,
  duration: Number, // ore di prenotazione
  text: String,
  user: String, // id dell'utente che lo prenota
});

module.exports = mongoose.model("Prenotation", prenotationSchema);
