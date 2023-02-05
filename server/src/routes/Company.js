const express = require("express");
const Company = require("../models/Company");
const Prenotation = require("../models/Prenotation");
const Receipt = require("../models/Receipt");
const jwt = require("../services/jwtUtils");
const router = express.Router();

/* Get all company list with query */
router.get("", async (req, res) => {
  try {
    const companies = await Company.find(req.query);
    var comp = [];
    companies.forEach((c) =>
      comp.push({
        _id: c._id,
        name: c.name,
        type: c.type,
        photo: c.photo,
        description: c.description,
        cost_per_hour: c.cost_per_hour,
        owner: c.owner,
        cities: c.cities,
        business_hours: c.business_hours,
        email: c.email,
        password: c.password,
        main_pets: c.main_pets,
        study_info: c.study_info,
        professional_experience: c.professional_experience,
        actual_jobs: c.actual_jobs,
        online: c.online,
        review: c.review,
      })
    );
    res.json(comp);
  } catch (e) {
    console.log(e);
  }
});

/* Get an company's information with token (with email and passwd) */
router.get("/getInfo", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const company = await Company.find({ _id: req.userid });
      res.json(company);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get an company's information by id (without email and passwd) */
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.json({
      _id: company._id,
      name: company.name,
      type: company.type,
      photo: company.photo,
      description: company.description,
      cost_per_hour: company.cost_per_hour,
      owner: company.owner,
      cities: company.cities,
      business_hours: company.business_hours,
      email: company.email,
      password: company.password,
      main_pets: company.main_pets,
      study_info: company.study_info,
      professional_experience: company.professional_experience,
      actual_jobs: company.actual_jobs,
      online: company.online,
      review: company.review,
    });
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new company */
router.put("/new", async (req, res) => {
  try {
    const c = new Company({
      name: req.body.name,
      type: req.body.type,
      photo: req.body.photo,
      description: req.body.description,
      cost_per_hour: req.body.cost_per_hour,
      owner: req.body.owner,
      cities: req.body.cities,
      business_hours: req.body.business_hours,
      email: req.body.email,
      password: req.body.password,
      main_pets: req.body.main_pets,
      study_info: req.body.study_info,
      professional_experience: req.body.professional_experience,
      actual_jobs: req.body.actual_jobs,
      photo: req.body.photo,
      online: req.body.online,
      review: [],
    });
    await c.save();
    res.json({ message: "New company created!" });
  } catch (e) {
    console.log(e);
  }
});

/* Delete a company */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await Prenotation.deleteMany({ company: req.params.id });
      await Company.deleteOne({ _id: req.params.id });
      res.json({ message: "Company deleted!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update company's infos */
router.post("/update/:id", async (req, res) => {
  try {
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        type: req.body.type,
        photo: req.body.photo,
        description: req.body.description,
        cost_per_hour: req.body.cost_per_hour,
        owner: req.body.owner,
        cities: req.body.cities,
        business_hours: req.body.business_hours,
        email: req.body.email,
        password: req.body.password,
        main_pets: req.body.main_pets,
        study_info: req.body.study_info,
        professional_experience: req.body.professional_experience,
        actual_jobs: req.body.actual_jobs,
        online: req.body.online,
        review: req.body.review,
      }
    );
    res.json({ message: "Update done!" });
  } catch (e) {
    res.json({ message: e });
  }
});

/* Claim money from prenotation */
router.post("/claimMoney", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      // console.log(req.userid);
      var thisComp = await Company.find({ _id: req.userid });
      thisComp = thisComp[0];

      // get prenotations
      const pl = await Prenotation.find({
        company: req.userid,
        claimed: false,
        start: { $lt: new Date() },
      });
      // for each past prenotation not claimed, create a receipt
      pl.forEach(async (i) => {
        const r = new Receipt({
          timestamp: new Date(),
          type: "service",
          description: thisComp.name + " - " + thisComp.type,
          amount: parseFloat(thisComp.cost_per_hour) * parseFloat(i.duration),
          receiver: req.userid,
          giver: i.user,
        });
        await r.save();
      });
      // update claimed field
      await Prenotation.updateMany(
        {
          company: req.userid,
          claimed: false,
          start: { $lt: new Date() },
        },
        { claimed: true }
      );
      res.json({ message: "Money claimed!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
