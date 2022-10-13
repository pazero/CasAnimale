const express = require("express");
const Post = require("../models/Post");
const jwt = require("../services/jwrUtils");
const router = express.Router();

/* get posts list */
router.get("", async (req, res) => {
  try {
    const posts = await Post.find(req.query);
    res.json(posts);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get a post by id */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new post */
router.put("/addPost", async (req, res) => {
  jwt.authenticateToken(req, res, cont);
  
  async function cont() {
    const post = new Post({
      userid: req.userid,
      title: req.body.title,
      description: req.body.description,
      date: new Date(),
    });
    await post.save();
    res.json({ message: "Post created succesfully!" });
  }
});

/* Delete a post */
router.delete("/:id", async (req, res) => {
  try {
    const removePost = await Post.deleteOne({ _id: req.params.id });
    res.json(removePost);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update post's infos */
router.post("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        user_id: req.body.userid,
        title: req.body.title,
        description: req.body.description,
        date: new Date(),
      }
    );
    res.json(updatedPost);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
