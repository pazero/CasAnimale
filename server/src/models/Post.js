const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Post schema fields */
const postSchema = new Schema({
  userid: String,
  title: String,
  photo: String,
  description: String,
  date: Date,
  comments: [String], // id of another post
});

module.exports = mongoose.model("Post", postSchema);
