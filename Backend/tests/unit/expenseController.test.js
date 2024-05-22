const {
  addExpense,
  getExpenses,
  deleteExpense,
  getExpensesId,
} = require("../../controllers/expenseController");
const Expense = require("../../models/ExpenseModel");

jest.mock("../../models/ExpenseModel");

describe("Expense Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { _id: "user123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  
  describe("Expense Controller - addExpense", () => {
    test("Should add expense when all fields are provided", async () => {
      const req = {
        body: {
          title: "Test Expense",
          amount: 100,
          category: "Test Category",
          description: "Test Description",
          date: new Date(),
        },
        user: { _id: "user123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Expense.mockReturnValueOnce({ save: jest.fn().mockResolvedValueOnce() });

      await addExpense(req, res);

      expect(Expense).toHaveBeenCalledWith({
        title: "Test Expense",
        amount: 100,
        category: "Test Category",
        description: "Test Description",
        date: expect.any(Date),
        user: "user123",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Expense added!" });
    });

    test("Should return error message when any required field is missing", async () => {
      const req = {
        body: {},
        user: { _id: "user123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await addExpense(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required!",
      });
    });

    test("Should return error message when amount is not a positive number", async () => {
      const req = {
        body: {
          title: "Test Expense",
          amount: -100,
          category: "Test Category",
          description: "Test Description",
          date: new Date(),
        },
        user: { _id: "user123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await addExpense(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Amount must be a positive number!",
      });
    });
  });

  describe("Expense Controller - getExpenses", () => {
    test("Should return expenses for the user", async () => {
      const fakeExpenses = [
        { title: "Expense 1", amount: 50, user: "user123" },
        { title: "Expense 2", amount: 100, user: "user123" },
      ];

      const sortMock = jest.fn().mockResolvedValue(fakeExpenses);
      const findMock = jest.fn().mockReturnValue({ sort: sortMock });

      Expense.find.mockImplementation(findMock);

      await getExpenses(req, res);

      expect(Expense.find).toHaveBeenCalledWith({ user: "user123" });
      expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeExpenses);
    });

    test("Should return server error if query fails", async () => {
      const sortMock = jest.fn().mockRejectedValue(new Error("Database error"));
      const findMock = jest.fn().mockReturnValue({ sort: sortMock });

      Expense.find.mockImplementation(findMock);

      await getExpenses(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error!" });
    });
  });

  describe("Expense Controller - deleteExpense", () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: { id: "expense123" },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    test("Should delete expense with given id", async () => {
      Expense.findByIdAndDelete.mockResolvedValueOnce({ _id: "expense123" });

      await deleteExpense(req, res);

      expect(Expense.findByIdAndDelete).toHaveBeenCalledWith("expense123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Expense deleted!" });
    });

    test("Should return 'Expense not found!' if expense with given id does not exist", async () => {
      Expense.findByIdAndDelete.mockResolvedValueOnce(null);

      await deleteExpense(req, res);

      expect(Expense.findByIdAndDelete).toHaveBeenCalledWith("expense123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Expense not found!" });
    });

    test("Should return server error if deletion fails", async () => {
      Expense.findByIdAndDelete.mockRejectedValueOnce(
        new Error("Database error")
      );

      await deleteExpense(req, res);

      expect(Expense.findByIdAndDelete).toHaveBeenCalledWith("expense123");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error!" });
    });
  });

  describe("Expense Controller - getExpensesId", () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: { userId: "user123" },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    test("should return expenses for the user", async () => {
      const fakeExpenses = [
        { title: "Expense 1", amount: 50, user: "user123" },
        { title: "Expense 2", amount: 100, user: "user123" },
      ];

      const sortMock = jest.fn().mockResolvedValue(fakeExpenses);
      const findMock = jest.fn().mockReturnValue({ sort: sortMock });

      Expense.find.mockImplementation(findMock);

      await getExpensesId(req, res);

      expect(Expense.find).toHaveBeenCalledWith({ user: "user123" });
      expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeExpenses);
    });

    test("should return server error if query fails", async () => {
      const sortMock = jest.fn().mockRejectedValue(new Error("Database error"));
      const findMock = jest.fn().mockReturnValue({ sort: sortMock });

      Expense.find.mockImplementation(findMock);

      await getExpensesId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error!" });
    });
  });
});
