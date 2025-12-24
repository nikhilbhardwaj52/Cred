const express = require("express");
const Balance = require("../models/Balance");
const auth = require("../config/middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const youOwe = await Balance.find({ from: req.user.id });
  const youAreOwed = await Balance.find({ to: req.user.id });

  res.json({ youOwe, youAreOwed });
});

router.post("/settle", auth, async (req, res) => {
  const bal = await Balance.findOne(req.body);
  if (!bal) return res.status(400).send("No dues");

  await bal.deleteOne();
  res.send("Settled");
});

module.exports = router;
