const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");
const validationMiddleware = require("../middleware/validationErrors");

const {
  signUpValidator,
  logInValidator,
  userIdValidator,
  getAllUsersValidator,
  updateUserValidator,
} = require("../middleware/validationRules");

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

// Public routes (no authentication required)
// userRoute.js
router.post(
  "/users/signup",
  upload.single("userImage"), // Handle file upload FIRST
  signUpValidator, // Then validate
  validationMiddleware,
  signUp
);
router.post("/users/login", logInValidator, validationMiddleware, logIn);

// Protected routes (require valid JWT token)
router.get(
  "/users",
  verifyToken,
  isAdmin,
  getAllUsersValidator,
  validationMiddleware,
  getAllUsers
);
router.get(
  "/users/:id",
  verifyToken,
  userIdValidator,
  validationMiddleware,
  getUserById
);
router.put(
  "/users/:id",
  verifyToken,
  updateUserValidator,
  validationMiddleware,
  updateUser
);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
