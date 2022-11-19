const express = require("express");
const Post = require("../models/Post");
const jwt = require("../services/jwrUtils");
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
        description: req.body.description,
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
      const removedPost = await Post.findById(req.params.id);
      if (req.userid == removedPost.userid) {
        // TODO da testare
        const msg = await Post.deleteOne({ _id: req.params.id });
        res.json(msg);
      }
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update post's infos */
router.post("/update", async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.body.prod_id },
      {
        user_id: req.body.userid,
        title: req.body.title,
        photo: req.body.photo,
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
