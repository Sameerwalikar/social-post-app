const { body, query } = require("express-validator");

const createPostValidator = [
  body("text").optional().isString().isLength({ max: 1000 }).withMessage("Invalid post text"),
];

const listPostsValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
];

module.exports = { createPostValidator, listPostsValidator };
