// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // admin, user, etc.
  profilePicture: { type: String }, // URL or image upload
  bio: { type: String },
  facebookProfile: { type: String },
  instagramProfile: { type: String },
  notificationPreferences: { type: String }, // Can be further detailed based on your needs
  emailPreferences: { type: String }, // Can be further detailed based on your needs
  twoFactorAuthentication: { type: Boolean, default: false },
  country: { type: String },
  city: { type: String },
  dateOfRegistration: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  accountStatus: { type: String, default: "active" }, // active, suspended, etc.
  passwordResetToken: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Array of tools available to the user
});

const User = mongoose.model("User", userSchema);

module.exports = User;
