const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sharedExpenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
    sharedIncomes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", FamilySchema);
