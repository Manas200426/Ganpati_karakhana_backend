const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};

module.exports = authMiddleware;
