const express = require("express");
const Prenotation = require("../models/Prenotation");
const jwt = require("../services/jwrUtils");
const router = express.Router();

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

/* Get a prenotation by company id */
router.get("/company", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const prenotation = await Prenotation.find({ company: req.userid });
      res.json(prenotation);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new prenotation */
router.put("/new", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const companyPrenotation = await Prenotation.find({
        company: req.userid,
      });
      for (const p of companyPrenotation) {
        if (
          dateRangeOverlaps(
            p.start,
            addHours(p.start, p.duration),
            req.body.start,
            addHours(req.body.start, req.body.duration)
          )
        ) {
          res.json({
            message: "Error: selected time overlaps with another reservation",
          });
        }
      }
      const prenotation = new Prenotation({
        company: req.userid,
        start: req.body.start,
        duration: req.body.duration,
        user: req.body.user,
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
        const msg = await Prenotation.deleteOne({ _id: req.params.id });
        res.json(msg);
      } else {
        res.json({ message: "You cannot eliminate this prenotation" });
      }
    }
    res.json({ message: "Prenotation eliminated" });
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
        user: req.body.user,
      }
    );
    res.json(updatedPrenotation);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
