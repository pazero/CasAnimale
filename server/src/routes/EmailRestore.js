const express = require("express");
const EmailRestore = require("../models/EmailRestore");
const router = express.Router();
const jwt = require("../services/jwtUtils");

/* Get all email list */
router.get("", async (req, res) => {
  try {
    const email = await EmailRestore.find(req.query);
    res.json(email);
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new email entry */
router.put("/new", async (req, res) => {
  try {
    const mail = new EmailRestore({
      mail: req.body.mail,
      timestamp: new Date(),
    });
    await mail.save();
    res.json({
      message:
        "You will receive an email from our administrator with a new password!",
    });
  } catch (e) {
    console.log(e);
  }
});

/* Delete an email */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      await EmailRestore.findByIdAndDelete(req.params.id);
      res.json({ message: "Mail deleted succesfully!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
