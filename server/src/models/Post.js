const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Post schema fields */
const postSchema = new Schema({
  userid: String,
  title: String,
  description: String,
  date: Date,
  comments: [Number],
});

module.exports = mongoose.model("Post", postSchema);
