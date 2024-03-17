// controllers/questionController.js
const Question = require("../models/questionModel");

// Get all questions with pagination
async function getQuestions(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 1; // Change the limit as needed

  try {
    const totalQuestions = await Question.countDocuments();
    const totalPages = Math.ceil(totalQuestions / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const questions = await Question.find().limit(limit).skip(startIndex);

    res.json({
      questions,
      pagination: {
        page,
        limit,
        totalPages,
        totalQuestions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllQuestions(req, res) {
  try {
    // Fetch all questions from the database
    const questions = await Question.find();

    // Return the questions as JSON response
    res.status(200).json(questions);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllQuestions,
};

// Create a new question
async function createQuestion(req, res) {
  try {
    // Extracting decision-making question data from the request body
    const { questionText, option1, option2 } = req.body;

    // Creating a new Question instance with the provided question text, options, pros, and cons
    const question = new Question({
      questionText,
      option1,
      option2,
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
  //const { optionText, pros, cons } = req.body;

  const data = req.body;
  console.log(id, data);

  try {
    // const updatedQuestion = await Question.findByIdAndUpdate(
    //   id,
    //   {
    //     option1: {
    //       text: optionText,
    //       pros: [...pros],
    //       cons: [...cons],
    //     },
    //   },
    //   { new: true }
    // );
    // res.status(200).json(updatedQuestion);
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
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
