const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  getExpensesId,
} = require("../controllers/expenseController");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router
  .post("/add-income", protect, addIncome)
  .get("/get-incomes", protect, getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", protect, addExpense)
  .get("/get-expenses", protect, getExpenses)
  .get("/get-expenses/:userId", protect, getExpensesId)
  .delete("/delete-expense/:id", deleteExpense)

module.exports = router;
