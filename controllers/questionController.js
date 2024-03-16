// controllers/questionController.js
const slugify = require("slugify");
const Question = require("../models/questionModel");

// Get all questions
async function getQuestions(req, res) {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new question
async function createQuestion(req, res) {
  try {
    // Extracting data from the request body
    const { name, category, shopName, purchaseLink } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Tool instance with name, category, purchaseLink and slug
    const question = new Question({
      name,
      category,
      shopName,
      purchaseLink,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Tool to the database
    const savedQuestion = await question.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating tool:", error);
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
