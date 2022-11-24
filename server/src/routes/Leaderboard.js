const express = require("express");
const Leaderboard = require("../models/Leaderboard");
const router = express.Router();
const jwt = require("../services/jwrUtils");

/* Get all pet list */
router.get("", async (req, res) => {
  try {
    const board = await Leaderboard.find(req.query);
    res.json(board);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new game entry */
router.put("/new", async (req, res) => {
  try {
    const game = new Leaderboard({
      game: req.body.game,
    });
    await game.save();
    res.json({ message: "Success!" });
  } catch (e) {
    console.log(e);
  }
});

/* Add a new user score */
router.post("/:game/add", async (req, res) => {
  try {
    console.log(req.headers);
    console.log(req.body);
    var game = await Leaderboard.find({ game: req.params.game });
    game = game[0];
    if (game.scores == undefined) {
      game.scores = [];
    }
    if (req.body.token != "") {
      jwt.authenticateToken(req, res, cont);

      function cont() {
        game.scores.push({
          name: "",
          points: req.body.points,
          userid: req.userid,
        });
      }
    } else {
      game.scores.push({
        name: req.body.name,
        points: req.body.points,
        userid: "",
      });
    }

    await Leaderboard.findOneAndUpdate({ _id: game._id }, game);
    res.json({ message: "Success!" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
