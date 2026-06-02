const { validationResult } = require("express-validator");
const { ApiError } = require("../utils/apiError");
const { errorResponse } = require("../utils/apiResponse");

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return next(new ApiError(400, firstError.msg));
  }
  return next();
};

const notFoundHandler = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message =
    err.message || (statusCode === 500 ? "Internal server error" : "Request failed");
  return errorResponse(res, message, statusCode);
};

module.exports = { validateRequest, notFoundHandler, errorHandler };
