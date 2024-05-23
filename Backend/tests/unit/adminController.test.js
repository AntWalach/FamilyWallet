const {
  deleteUser,
  getAllUsers,
} = require("../../controllers/auth/adminController");
const User = require("../../models/auth/UserModel.js");

jest.mock("../../models/auth/UserModel.js");

describe("Admin Controller", () => {
  describe("Admin Controller - deleteUser", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Should return 404 if user is not found", async () => {
      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndDelete.mockResolvedValueOnce(null);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    test("Should return 200 if user is deleted successfully", async () => {
      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndDelete.mockResolvedValueOnce({ _id: "123" });

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully!",
      });
    });

    test("Should return 500 if an error occurs while deleting user", async () => {
      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndDelete.mockRejectedValueOnce("error");

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Can't delete user." });
    });
  });

  describe("Admin Controller - getAllUsers", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Should return all users", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const users = [
        { _id: "1", name: "User 1" },
        { _id: "2", name: "User 2" },
      ];

      User.find.mockResolvedValueOnce(users);

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    test("Should return 404 if no users are found", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.find.mockResolvedValueOnce(null);

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No users found" });
    });

    test("Should return 500 if an error occurs while fetching users", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.find.mockRejectedValueOnce("error");

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Cannot get users" });
    });
  });
});
