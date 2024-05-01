const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/auth/userController.js");
const { protect, adminMiddleware } = require("../middleware/authMiddleware.js");
const {
  deleteUser,
  getAllUsers,
} = require("../controllers/auth/adminController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);
router.get("/admin/users", protect, adminMiddleware, getAllUsers);

router.get("/login-status", userLoginStatus);
router.post("/verify-email", protect, verifyEmail);
router.post("/verify-user/:verificationToken", verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetPasswordToken", resetPassword);
router.patch("/change-password", protect, changePassword)

module.exports = router;
