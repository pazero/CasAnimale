const express = require("express");
const Admin = require("../models/Admin");
const Company = require("../models/Company");
const jwt = require("../services/jwtUtils");
const router = express.Router();

/* Get admin list */
router.get("", async (req, res) => {
  try {
    const admins = await Admin.find(req.query);
    res.json(admins);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get a admin by id */
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new admin */
router.put("/new", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const admin = new Admin({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        until: req.body.until,
      });
      await admin.save();
      res.json({ message: "Admin added succesfully!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Delete an admin */
router.delete("/:id", async (req, res) => {
  try {
    await Admin.deleteOne({ _id: req.params.id });
    res.json({ message: "Admin deleted succesfully!" });
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update admin's infos */
router.post("/update", async (req, res) => {
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        until: req.body.until,
      }
    );
    res.json({message: "Update done!"});
  } catch (e) {
    res.json({ message: e });
  }
});

/* Admin and company user */
router.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      var ret = await Admin.find(req.body);
      var isAdmin = false;
      ret = ret[0];
      if (ret === undefined) {
        ret = await Company.find(req.body);
        ret = ret[0];
        if (ret === undefined) {
          res.json({
            message: "No user found with this email or password",
            success: false,
          });
          return;
        }
      } else isAdmin = true;

      const token = jwt.generateAccessToken({ id: ret._id, admin: isAdmin });
      res.cookie("tokenback", token, {
        path: "/",
        maxAge: 2 * 60 * 60 * 1000,
      });
      res.json({
        message: `Login of ${req.body.email} done!`,
        success: true,
      });
    } else {
      res.json({
        message: `You must enter a password or an email`,
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/getId", (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      res.json({ id: req.userid, admin: req.admin });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
