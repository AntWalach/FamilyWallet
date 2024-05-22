const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.user._id;
  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Income added!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const userId = req.user._id;
    const incomes = await IncomeSchema.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncome = await IncomeSchema.findByIdAndDelete(id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found!" });
    }
    res.status(200).json({ message: "Income deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};
