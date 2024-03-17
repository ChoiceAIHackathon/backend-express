// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Authorization failed. No access tokenZZZ." });

  // Extract the token without the "Bearer " prefix
  const token = authorizationHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // Handle error
      console.log(err);
      return res
        .status(403)
        .json({ message: "Authorization failed. Could not verify token." });
    }
    req.user = decoded;
    console.log("AuthenticateToken middlware done");
    next();
  });
};

const isAuthenticated = (req, res, next) => {
  // Check if user is authenticated (token is present)
  const authorizationHeader = req.header("Authorization");
  // Extract the token without the "Bearer " prefix
  const token = authorizationHeader.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ message: "Authorization failed. No access tokenXXX." });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res
        .status(403)
        .json({ message: "Authorization failed. Could not verify tokenYYY." });
    }

    req.user = decoded;
    console.log("isAuthenticated middlware done");
    next();
  });
};

const isQuestionOwner = (req, res, next) => {
  const { user } = req;
  const { userId } = req.params;

  if (user.userId !== userId) {
    return res.status(403).json({ message: "Forbidden - Not the owner" });
  }

  next();
};

const isAdmin = (req, res, next) => {
  // Check if the user is an admin
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Permission denied. User is not an admin." });
    }

    // Store user information in req.user for consistency with other middlewares
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
  isAuthenticated,
  isQuestionOwner,
  isAdmin,
};
