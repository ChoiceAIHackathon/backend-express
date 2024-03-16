// models/questionModel.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  option1: {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    pros: [
      {
        type: String,
        required: true,
      },
    ],
    cons: [
      {
        type: String,
        required: true,
      },
    ],
  },
  option2: {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    pros: [
      {
        type: String,
        required: true,
      },
    ],
    cons: [
      {
        type: String,
        required: true,
      },
    ],
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
