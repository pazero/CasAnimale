const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Post schema fields */
const postSchema = new Schema({
  userid: String,
  title: String,
  photo: String,
  description: String,
  date: Date,
  type: String,
  comments: [{ user: String, content: String, date: String }], // array of userid and comment's content
});

module.exports = mongoose.model("Post", postSchema);
