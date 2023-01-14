const express = require("express");
const Prenotation = require("../models/Prenotation");
const Company = require("../models/Company");
const jwt = require("../services/jwrUtils");
const router = express.Router();

function addHours(numOfHours, str) {
  var date = new Date(str);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

function dateOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

function checkDateAndWorkingHours(d1, d2) {
  var date = new Date(d2.start);
  if (date.getHours() < d1.business_hours.start) return true;
  if (date.getHours() > d1.business_hours.end) return true;
  if (addHours(d2.duration, d2.start).getHours() > d1.business_hours.end)
    return true;
  return false;
}

async function isDateInWorkingHours(req, res) {
  const company = await Company.find({ _id: req.body.company });
  if (checkDateAndWorkingHours(company[0], req.body)) {
    res.json({
      message: "Error: the company is not open at this hour",
    });
    return true;
  }
  return false;
}

function isDurationNegative(req, res) {
  if (req.body.duration < 0) {
    res.json({
      message: "Error: negative duration",
    });
    return true;
  }
  return false;
}

async function arePrenotationsOverlaping(req, res) {
  const companyPrenotation = await Prenotation.find({
    company: req.body.company,
  });
  for (const p of companyPrenotation) {
    if (
      dateOverlaps(
        p.start,
        addHours(p.duration, p.start),
        req.body.start,
        addHours(req.body.duration, req.body.start)
      )
    ) {
      res.json({
        message: "Error: selected time overlaps with another reservation",
      });
      return true;
    }
  }
  return false;
}

router.get("", async (req, res) => {
  try {
    const prenotation = await Prenotation.find(req.query);
    res.json(prenotation);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get all prenotation of a company using jwt */
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
      if (
        isDurationNegative(req, res) ||
        (await isDateInWorkingHours(req, res)) ||
        (await arePrenotationsOverlaping(req, res))
      ) {
        console.log("Somethig went wrong...");
        return;
      }

      const prenotation = new Prenotation({
        company: req.body.company,
        start: req.body.start,
        duration: req.body.duration,
        user: req.userid,
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
      const msg = await Prenotation.deleteOne({ _id: req.params.id });
      res.json(msg);
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
