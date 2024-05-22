const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const {
  createFamily,
  registerFamilyMember,
  getFamily,
  deleteFamily,
} = require("../controllers/familyController");

router
  .post("/create-family", protect, createFamily)
  .post("/register-family-member", protect, registerFamilyMember)
  .get("/family", protect, getFamily)
  .delete("/delete-family/:id", protect, deleteFamily);
module.exports = router;
