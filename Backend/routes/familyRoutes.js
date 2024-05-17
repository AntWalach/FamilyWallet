const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const {
  createFamily,
  registerFamilyMember,
  getFamily,
} = require("../controllers/family");

router
  .post("/create-family", protect, createFamily)
  .post("/register-family-member", registerFamilyMember)
  .get("/family/:id", protect, getFamily);
module.exports = router;
