const express = require("express");
const Group = require("../models/Group");
const auth = require("../config/middleware/auth");
const { app } = require("../server");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const group = await Group.create(req.body);
  res.json(group);
});

module.exports = router;

