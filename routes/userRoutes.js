// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../middleware/validations/userValidation");
const { authenticateToken } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
