const express = require("express");
const Expense = require("../models/Expense");
const Balance = require("../models/Balance");
const auth = require("../config/middleware/auth");

const router = express.Router();

async function updateBalance(from, to, amount) {
  const rev = await Balance.findOne({ from: to, to: from });

  if (rev) {
    const net = amount - rev.amount;
    if (net > 0) {
      rev.amount = net;
      rev.from = from;
      rev.to = to;
      await rev.save();
    } else if (net < 0) {
      rev.amount = -net;
      await rev.save();
    } else {
      await rev.deleteOne();
    }
  } else {
    await Balance.create({ from, to, amount });
  }
}

router.post("/", auth, async (req, res) => {
  const { paidBy, amount, splitType, splits } = req.body;

  for (const s of splits) {
    if (s.userId.toString() !== paidBy) {
      await updateBalance(s.userId, paidBy, s.value);
    }
  }

  const expense = await Expense.create(req.body);
  res.json(expense);
});

module.exports = router;
