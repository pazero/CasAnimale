const express = require("express");
const Receipt = require("../models/Receipt");
const User = require("../models/User");
const jwt = require("../services/jwtUtils");
const router = express.Router();

/* Get all receipt list */
router.get("", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const receipts = await Receipt.find(req.query);
      res.json(receipts);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Get a receipt by id */
router.get("/:id", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const receipt = await Receipt.findById(req.params.id);
      res.json(receipt);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Create a new receipt */
router.put("/new", async (req, res) => {
  try {
    jwt.authenticateToken(req, res, cont);

    async function cont() {
      const receipt = new Receipt({
        timestamp: req.body.timestamp,
        type: req.body.type,
        description: req.body.description,
        amount: req.body.import,
        receiver: req.body.receiver,
        giver: req.body.giver,
      });
      await receipt.save();
      res.json({ message: "Receipt added succesfully!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Delete a receipt */
router.delete("/:id", async (req, res) => {
  try {
    jwt.authenticateAdmin(req, res, cont);

    async function cont() {
      await Receipt.deleteOne({ _id: req.params.id });
      res.json({ message: "Receipt deleted succesfully!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update receipt's infos */
router.post("/update", async (req, res) => {
  try {
    jwt.authenticateAdmin(req, res, cont);
    async function cont() {
      await Receipt.findOneAndUpdate(
        { _id: req.body.id },
        {
          timestamp: req.body.timestamp,
          type: req.body.type,
          description: req.body.description,
          amount: req.body.amount,
          receiver: req.body.receiver,
          giver: req.body.giver,
        }
      );
      res.json({ message: "Update done!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/* Update receipt's infos */
router.post("/claimVipIncomes", async (req, res) => {
  try {
    jwt.authenticateAdmin(req, res, cont);

    async function cont() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const vipUser = await User.find({ vip: true });
      if (vipUser.length > 0) {
        const d = new Date();
        const receipt = new Receipt({
          timestamp: new Date(),
          type: "vip",
          description: "vip gains of " + monthNames[d.getMonth()],
          amount: vipUser.length * 15,
          receiver: "casanimale",
          giver: vipUser.length + " vip users",
        });
        await receipt.save();
        res.json({ message: "Vip money claimed!" });
      } else res.json({ message: "No vip users found!" });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
