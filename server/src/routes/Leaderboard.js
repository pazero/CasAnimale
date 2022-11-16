const express = require("express");
const Leaderbord = require("../models/Leaderboard");
const router = express.Router();

/* Get all pet list */
router.get("", async (req, res) => {
  try {
    const board = await Leaderbord.find(req.query);
    res.json(board);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new game entry */
router.put("/new", async (req, res) => {
  try {
    const game = new Leaderbord({
      game: req.body.game,
    });
    await game.save();
    res.json({ message: "Success!" });
  } catch (e) {
    res.json({ message: e });
  }
});

/* Add a new user score */
router.post("/:game/add", async (req, res) => {
  try {
    var game = await Leaderbord.find({ game: req.params.game });
    game = game[0];
    if (game.scores == undefined) {
      game.scores = [];
    }
    game.scores.push({
      name: req.body.name,
      points: req.body.points,
      userid: req.body.userid,
    });

    await Leaderbord.findOneAndUpdate(game);
    res.json({ message: "Success!" });
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
