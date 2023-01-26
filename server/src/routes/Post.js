const express = require("express");
const Post = require("../models/Post");
const jwt = require("../services/jwtUtils");
const router = express.Router();

/* Get all posts list */
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
router.put("/new", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const post = new Post({
        userid: req.userid,
        title: req.body.title,
        photo: req.body.photo,
        type: req.body.type,
        description: req.body.description,
        comments: [],
        date: new Date(),
      });
      await post.save();
      res.json({ message: "Post created succesfully!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Delete a post */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await Post.deleteOne({ _id: req.params.id });
      res.json({ message: "Post removed succesfully" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update post's infos */
router.post("/update/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        user_id: req.body.userid,
        title: req.body.title,
        photo: req.body.photo,
        type: req.body.type,
        description: req.body.description,
        comments: req.body.comments,
      }
    );
    res.json({ message: "Update done!" });
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
