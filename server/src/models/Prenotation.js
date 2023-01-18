const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Prenotation schema fields */
const prenotationSchema = new Schema({
  company: String, // id company
  place: String, // presence or online
  start: Date,
  duration: Number, // ore di prenotazione
  user: String, // id dell'utente che lo prenota
});

module.exports = mongoose.model("Prenotation", prenotationSchema);
