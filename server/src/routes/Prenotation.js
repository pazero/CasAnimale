const express = require("express");
const Prenotation = require("../models/Prenotation");
const jwt = require("../services/jwrUtils");
const router = express.Router();

/* Get all prenotation list */
router.get("", async (req, res) => {
  try {
    const posts = await Prenotation.find(req.query);
    res.json(posts);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get a prenotation by id */
router.get("/:id", async (req, res) => {
  try {
    const prenotation = await Prenotation.findById(req.params.id);
    res.json(prenotation);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new prenotation */
router.put("/addPrenotation", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const prenotation = new Prenotation({
        company: req.userid,
        start: req.body.start,
        duration: req.body.duration,
      });
      await prenotation.save();
      res.json({ message: "Prenotation created succesfully!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Delete a prenotation */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const removedPrenotation = await Prenotation.findById(req.params.id);
      if (req.userid == removedPrenotation.company) {
        // TODO da testare
        const msg = await Prenotation.deleteOne({ _id: req.params.id });
        res.json(msg);
      }
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update prenotation's infos */
router.post("/update", async (req, res) => {
  try {
    const updatedPrenotation = await Post.findOneAndUpdate(
      { _id: req.body.prenotation_id },
      {
        start: req.body.start,
        duration: req.body.duration,
      }
    );
    res.json(updatedPrenotation);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
