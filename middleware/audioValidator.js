const { body } = require("express-validator");
const ALLOWED_GENRES = [
  "pop",
  "rock",
  "hiphop",
  "jazz",
  "classical",
  "electronic",
  "rnb",
  "country",
];

exports.audioValidator = [
  // Title validation
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  // Genre validation
  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required")
    .isIn(ALLOWED_GENRES)
    .withMessage(`Invalid genre. Allowed: ${ALLOWED_GENRES.join(", ")}`),

  // isPrivate validation
  body("isPrivate")
    .optional()
    .isBoolean()
    .withMessage("isPrivate must be a boolean")
    .toBoolean(),
];
