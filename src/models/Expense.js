const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  groupId: mongoose.Schema.Types.ObjectId,
  paidBy: mongoose.Schema.Types.ObjectId,
  amount: Number,
  splitType: String,
  splits: [{
    userId: mongoose.Schema.Types.ObjectId,
    value: Number
  }]
});

module.exports = mongoose.model("Expense", expenseSchema);
