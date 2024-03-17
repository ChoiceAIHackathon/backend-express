// routes/index.js
const express = require("express");
const router = express.Router();
const questionRoutes = require("./questionRoutes");
const userRoutes = require("./userRoutes");

const {
  authenticateToken,
  isAuthenticated,
  isQuestionOwner,
} = require("../middleware/authMiddleware");

// routes
router.use("/questions", questionRoutes);
router.use("/users", userRoutes);

module.exports = router;
