// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate token and include user data
    const token = generateToken(user);
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // Generate and send a token for authentication
    res.status(200).json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateToken(user) {
  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, secretKey);

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
}
