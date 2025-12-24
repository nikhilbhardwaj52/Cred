const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  from: mongoose.Schema.Types.ObjectId,
  to: mongoose.Schema.Types.ObjectId,
  amount: Number
});

module.exports = mongoose.model("Balance", balanceSchema);
