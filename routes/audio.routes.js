const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const audioUpload = require("../middleware/uploadAudio"); // Unique name

const audioController = require("../controllers/audioController");

router.post(
  "/upload",
  verifyToken,
  audioUpload.single("file"),
  audioController.uploadAudio
);

module.exports = router;
