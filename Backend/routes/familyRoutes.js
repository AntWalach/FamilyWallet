const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const { createFamily, joinFamily } = require("../controllers/family");

router
  .post("/create-family", protect, createFamily)
  .post("/join-family/:familyName", protect, joinFamily);

module.exports = router;
