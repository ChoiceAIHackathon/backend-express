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
// router.use("/questions", authenticateToken, isAuthenticated, recipeRoutes);
router.use("/questions", questionRoutes);
router.use("/users", userRoutes);

module.exports = router;

// const { authenticateToken, isAuthenticated, isOwner } = require("./middleware/authMiddleware");

// // Example usage in a route handler
// app.post("/api/posts", authenticateToken, isAuthenticated, (req, res) => {
//   // Only authenticated users can create posts
//   // Additional logic...
// });

// app.put("/api/posts/:postId", authenticateToken, isAuthenticated, isOwner, (req, res) => {
//   // Only the owner of the post can update it
//   // Additional logic...
// });
