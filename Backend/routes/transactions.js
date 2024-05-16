const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");

const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router
  .post("/add-income", protect, addIncome)
  .get("/get-incomes", protect, getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", protect, addExpense)
  .get("/get-expenses", protect, getExpenses)
  .delete("/delete-expense/:id", deleteExpense)

module.exports = router;
