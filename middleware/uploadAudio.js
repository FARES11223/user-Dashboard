const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads/audio/",
    filename: (req, file, cb) => {
      cb(null, `audio-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only audio files (MP3/WAV/OGG) allowed"));
  },
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
});
