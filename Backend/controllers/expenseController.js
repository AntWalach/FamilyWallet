const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.user._id;
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: userId,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense added!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }

  //console.log(income);
};

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const expense = await ExpenseSchema.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found!" });
    }
    res.status(200).json({ message: "Expense deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

exports.getExpensesId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const expenses = await ExpenseSchema.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};
