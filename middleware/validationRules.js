// middleware/validationRules.js
const { body, param } = require("express-validator");

exports.signUpValidator = [
  body("name").notEmpty().withMessage("Name is required").isLength({ min: 3 }),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("userImage")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("User image is required");
      }
      return true;
    })
    .withMessage("User image is required"),
];

exports.logInValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

exports.updateUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("userImage").notEmpty().withMessage("User image is required"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "user"])
    .withMessage("Role must be either 'admin' or 'user'"),
];

exports.getAllUsersValidator = [
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role must be 'admin' or 'user'"),
];

exports.userIdValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];
