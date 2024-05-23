const Family = require("../../models/FamilyModel.js");
const User = require("../../models/auth/UserModel.js");
const {
  createFamily,
  getFamily,
  deleteFamily,
} = require("../../controllers/familyController");


jest.mock("../../models/FamilyModel.js");
jest.mock("../../models/auth/UserModel.js");
jest.mock("../../helpers/generateToken.js");

describe("Family Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createFamily", () => {
    test("should create a new family and return 201 status", async () => {
      const req = {
        body: { name: "Test Family" },
        user: { _id: "owner123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const owner = { _id: "owner123", save: jest.fn() };
      User.findById.mockResolvedValueOnce(owner);
      const family = { _id: "family123", save: jest.fn() };
      Family.mockReturnValueOnce(family);

      await createFamily(req, res);

      expect(User.findById).toHaveBeenCalledWith("owner123");
      expect(Family).toHaveBeenCalledWith({
        name: "Test Family",
        owner: "owner123",
        members: ["owner123"],
      });
      expect(family.save).toHaveBeenCalled();
      expect(owner.family).toBe(family._id);
      expect(owner.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Family created",
        data: family,
      });
    });

    test("should return 404 if owner is not found", async () => {
      const req = {
        body: { name: "Test Family" },
        user: { _id: "nonexistentOwner" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockResolvedValueOnce(null);

      await createFamily(req, res);

      expect(User.findById).toHaveBeenCalledWith("nonexistentOwner");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Owner not found!" });
    });

    test("should return 500 if an error occurs", async () => {
      const req = {
        body: { name: "Test Family" },
        user: { _id: "owner123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValueOnce(new Error("Database error"));

      await createFamily(req, res);

      expect(User.findById).toHaveBeenCalledWith("owner123");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });

  describe("Family Controller - getFamily", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should return family data and status 200 if family exists", async () => {
      const req = {
        user: { family: "family123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const family = {
        _id: "family123",
        members: [
          { name: "John Doe", email: "john@example.com" },
          { name: "Jane Doe", email: "jane@example.com" },
        ],
      };
      const mockPopulate = jest.fn().mockResolvedValueOnce(family);
      Family.findById.mockReturnValueOnce({ populate: mockPopulate });

      await getFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("family123");
      expect(mockPopulate).toHaveBeenCalledWith(
        "members",
        "name email role photo bio isVerified"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(family);
    });

    test("should return 404 if family is not found", async () => {
      const req = {
        user: { family: "nonexistentFamily" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockPopulate = jest.fn().mockResolvedValueOnce(null);
      Family.findById.mockReturnValueOnce({ populate: mockPopulate });

      await getFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("nonexistentFamily");
      expect(mockPopulate).toHaveBeenCalledWith(
        "members",
        "name email role photo bio isVerified"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Family not found" });
    });

    test("should return 500 if an error occurs", async () => {
      const req = {
        user: { family: "family123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockPopulate = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));
      Family.findById.mockReturnValueOnce({ populate: mockPopulate });

      await getFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("family123");
      expect(mockPopulate).toHaveBeenCalledWith(
        "members",
        "name email role photo bio isVerified"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error!" });
    });
  });

  describe("Family Controller - deleteFamily", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should delete family and return status 200", async () => {
      const req = {
        params: { id: "family123" },
        user: { _id: "owner123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const family = {
        _id: "family123",
        owner: { equals: jest.fn().mockReturnValue(true) },
        members: ["owner123", "member1", "member2"],
      };

      const owner = {
        _id: "owner123",
        family: "family123",
        save: jest.fn(),
      };

      Family.findById.mockResolvedValueOnce(family);
      User.deleteMany.mockResolvedValueOnce();
      Family.findByIdAndDelete.mockResolvedValueOnce();
      User.findById.mockResolvedValueOnce(owner);

      await deleteFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("family123");
      expect(family.owner.equals).toHaveBeenCalledWith("owner123");
      expect(User.deleteMany).toHaveBeenCalledWith({
        _id: { $in: family.members, $ne: "owner123" },
      });
      expect(Family.findByIdAndDelete).toHaveBeenCalledWith("family123");
      expect(User.findById).toHaveBeenCalledWith("owner123");
      expect(owner.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Family deleted" });
    });

    test("should return 404 if family is not found", async () => {
      const req = {
        params: { id: "nonexistentFamily" },
        user: { _id: "owner123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Family.findById.mockResolvedValueOnce(null);

      await deleteFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("nonexistentFamily");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Family not found" });
    });

    test("should return 403 if user is not authorized to delete the family", async () => {
      const req = {
        params: { id: "family123" },
        user: { _id: "nonOwner123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const family = {
        _id: "family123",
        owner: { equals: jest.fn().mockReturnValue(false) },
        members: ["owner123", "member1", "member2"],
      };

      Family.findById.mockResolvedValueOnce(family);

      await deleteFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("family123");
      expect(family.owner.equals).toHaveBeenCalledWith("nonOwner123");
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "You are not authorized to delete this family",
      });
    });

    test("should return 500 if an error occurs", async () => {
      const req = {
        params: { id: "family123" },
        user: { _id: "owner123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Family.findById.mockRejectedValueOnce(new Error("Database error"));

      await deleteFamily(req, res);

      expect(Family.findById).toHaveBeenCalledWith("family123");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });
});
