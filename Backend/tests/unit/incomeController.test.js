const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../../controllers/incomeController");
const Income = require("../../models/IncomeModel");

jest.mock("../../models/IncomeModel");

describe("Income Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      user: { _id: "user123" },
      params: { id: "income123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("Income Controller - addIncome", () => {
    test("Should add income when all fields are provided", async () => {
      const req = {
        body: {
          title: "Test Income",
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

      Income.mockReturnValueOnce({ save: jest.fn().mockResolvedValueOnce() });

      await addIncome(req, res);

      expect(Income).toHaveBeenCalledWith({
        title: "Test Income",
        amount: 100,
        category: "Test Category",
        description: "Test Description",
        date: expect.any(Date),
        user: "user123",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Income added!" });
    });

    test("Should return error message when any required field is missing", async () => {
      req.body = {};

      await addIncome(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required!",
      });
    });

    test("Should return error message when amount is not a positive number", async () => {
      req.body = {
        title: "Test Income",
        amount: -100,
        category: "Test Category",
        description: "Test Description",
        date: new Date(),
      };

      await addIncome(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Amount must be a positive number!",
      });
    });
  });

  describe("Income Controller - getIncomes", () => {
    test("Should return incomes for the user", async () => {
      const fakeIncomes = [
        { title: "Income 1", amount: 50, user: "user123" },
        { title: "Income 2", amount: 100, user: "user123" },
      ];

      const sortMock = jest.fn().mockResolvedValue(fakeIncomes);
      const findMock = jest.fn().mockReturnValue({ sort: sortMock });

      Income.find.mockImplementation(findMock);

      await getIncomes(req, res);

      expect(Income.find).toHaveBeenCalledWith({ user: "user123" });
      expect(Income.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeIncomes);
    });

    test("Should return server error if query fails", async () => {
      const sortMock = jest.fn().mockRejectedValue(new Error("Database error"));
      const findMock = jest.fn().mockReturnValue({ sort: sortMock });

      Income.find.mockImplementation(findMock);

      await getIncomes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error!" });
    });
  });

  describe("Income Controller - deleteIncome", () => {
    test("Should delete income with given id", async () => {
      const deletedIncome = { _id: "income123", user: "user123" };

      Income.findByIdAndDelete.mockResolvedValueOnce(deletedIncome);

      await deleteIncome(req, res);

      expect(Income.findByIdAndDelete).toHaveBeenCalledWith("income123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Income deleted!" });
    });

    test("Should return not found if income to delete does not exist", async () => {
      Income.findByIdAndDelete.mockResolvedValueOnce(null);

      await deleteIncome(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Income not found!" });
    });

    test("Should return server error if deletion fails", async () => {
      Income.findByIdAndDelete.mockRejectedValueOnce(
        new Error("Database error")
      );

      await deleteIncome(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error!" });
    });
  });
});
