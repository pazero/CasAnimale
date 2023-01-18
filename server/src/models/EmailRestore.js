const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailRestoreSchema = new Schema({
  mail: String,
  timestamp: Date,
});

module.exports = mongoose.model("EmailRestore", emailRestoreSchema);
