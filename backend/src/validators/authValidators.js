const { body } = require("express-validator");

const registerValidator = [
  body("username").trim().isLength({ min: 3, max: 32 }).withMessage("Invalid username"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
];

const loginValidator = [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password").isString().notEmpty().withMessage("Password is required"),
];

const commentValidator = [
  body("text").trim().isLength({ min: 1, max: 500 }).withMessage("Comment is required"),
];

module.exports = { registerValidator, loginValidator, commentValidator };
