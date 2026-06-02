const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { User } = require("../models/User");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("./asyncHandler");

const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  req.user = user;
  next();
});

module.exports = { protect };
