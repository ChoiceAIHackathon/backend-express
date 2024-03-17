// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateQuestion,
  validateUpdateQuestion,
} = require("../middleware/validations/questionValidation");
const questionController = require("../controllers/questionController");

// Get all questions
router.get("/", questionController.getQuestions);

// Create a new question
router.post(
  "/",
  validateCreateQuestion,
  validateRequest,
  questionController.createQuestion
);

router.patch(
  "/:id",
  validateUpdateQuestion,
  validateRequest,
  questionController.updateQuestion
);

// Delete a question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
