// Validation middleware for the "createQuestion" route
const { body } = require("express-validator");
const Question = require("../../models/questionModel");
const validator = require("validator");

const validateCreateQuestion = [];

const validateUpdateQuestion = [];

module.exports = {
  validateCreateQuestion,
  validateUpdateQuestion,
};
