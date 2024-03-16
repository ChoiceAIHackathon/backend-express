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

// Update an existing question
router.put(
  "/:id",
  validateUpdateQuestion,
  validateRequest,
  questionController.updateQuestion
);

// Delete a question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;

// // mongodb+srv://irigerte:<5pEvNF7yMSWI9ITU>@cluster0.b4lfk0v.mongodb.net/
// 5pEvNF7yMSWI9ITU
// mongodb+srv://irigerte:pEvNF7yMSWI9ITU@cluster0.b4lfk0v.mongodb.net/questiondb?retryWrites=true&w=majority
// B_URL=mongodb+srv://olegs:86MV3WJre2oTx7j2@nodecluster.cxk6m0c.mongodb.net/questiondb?retryWrites=true&w=majority
