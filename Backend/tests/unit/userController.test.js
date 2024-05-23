const User = require("../../models/auth/UserModel.js");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth/userController.js");
const bcrypt = require("bcrypt");
const generateToken = require("../../helpers/generateToken.js");


jest.mock("../../models/auth/UserModel.js");
jest.mock("../../helpers/generateToken.js");
jest.mock("bcrypt");
describe("User Controller", () => {
  describe("User Controller - registerUser", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Should return 400 if any field is missing", async () => {
      const req = {
        body: { name: "Test User", email: "", password: "" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });

    test("Should return 400 if password is less than 6 characters", async () => {
      const req = {
        body: { name: "Test User", email: "test@example.com", password: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password must be at least 6 characters",
      });
    });

    test("Should return 400 if user already exists", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "123456",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce({ email: "test@example.com" });

      await registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });

    test("Should create user and return 201 status with user data and token", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "123456",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        role: "user",
        photo: null,
        bio: null,
        isVerified: false,
        familyRole: "parent",
        save: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce(null);
      User.create.mockResolvedValueOnce(user);
      generateToken.mockReturnValue("fakeToken");

      await registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(User.create).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        familyRole: "parent",
      });
      expect(generateToken).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        photo: null,
        bio: null,
        isVerified: false,
        token: "fakeToken",
      });
    });

    test("Should return 400 if email is invalid", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "invalid_email",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email format",
      });
    });
  });

  describe("User Controller - loginUser", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Should return 400 if any field is missing", async () => {
      const req = {
        body: { email: "", password: "" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });

    test("Should return 400 if email is in invalid format", async () => {
      const req = {
        body: {
          email: "invalid_email",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email format",
      });
    });
  });

  test("Should return 404 if user is not found", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValueOnce(null);

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found, sign up!",
    });
  });

  test("Should return 400 if password is incorrect", async () => {
    const req = {
      body: { email: "test@example.com", password: "wrong_password" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const mockUser = {
      email: "test@example.com",
      password: "correct_password",
    };

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrong_password",
      "correct_password"
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  test("Should return 200 with user data and token if login is successful", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const mockUser = {
      _id: "user123",
      name: "Test User",
      email: "test@example.com",
      role: "user",
      photo: null,
      bio: null,
      isVerified: false,
    };

    const mockToken = "fakeToken";

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    generateToken.mockReturnValueOnce(mockToken);

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(generateToken).toHaveBeenCalledWith("user123");
    expect(res.cookie).toHaveBeenCalledWith("token", mockToken, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 60 * 1000,
      sameSite: true,
      secure: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: "user123",
      name: "Test User",
      email: "test@example.com",
      role: "user",
      photo: null,
      bio: null,
      isVerified: false,
      token: mockToken,
    });
  });
});
