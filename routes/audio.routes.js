const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const uploadAudioMiddleware = require("../middleware/uploadAudio");
const { audioValidator } = require("../middleware/audioValidator");
const { uploadAudio } = require("../controllers/audioController");

router.post(
  "/upload",
  verifyToken,
  audioValidator,
  uploadAudioMiddleware.single("audioFile"),
  uploadAudio
);

module.exports = router;
