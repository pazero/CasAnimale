const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Company schema fields */
const boardSchema = new Schema({
  game: String,
  scores: [{
    name: String,
    points: Number,
    userid: String,
  }],
});

module.exports = mongoose.model("Leaderboard", boardSchema);
