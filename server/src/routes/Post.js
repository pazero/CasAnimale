const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const posts = await Post.find(req.query);
    res.json(posts);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
