// controllers/questionController.js
const slugify = require("slugify");
const Question = require("../models/questionModel");

// Get all questions
// async function getQuestions(req, res) {
//   try {
//     const questions = await Question.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// Get questions with pagination
async function getQuestions(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 1; // Set the number of items per page
  const skip = (page - 1) * limit;

  try {
    const questions = await Question.find().skip(skip).limit(limit);
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new question
async function createQuestion(req, res) {
  try {
    // Extracting decision-making question data from the request body
    const { questionText, option1, option2 } = req.body;

    // // Optionally, generate a slug for the question to use in URLs or as an identifier
    // const slug = slugify(questionText, { lower: true, strict: true });

    // Creating a new Question instance with the provided question text, options, pros, and cons
    const question = new Question({
      questionText,
      option1,
      option2,
      // slug // Assuming your Question model supports a 'slug' field for easy referencing
    });

    // Saving the new Question to the database
    const savedQuestion = await question.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing question
async function updateQuestion(req, res) {
  const { id } = req.params;
  const { name, category, shopName, purchaseLink } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { name, category, shopName, purchaseLink },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a question
async function deleteQuestion(req, res) {
  const { id } = req.params;

  try {
    await Question.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
