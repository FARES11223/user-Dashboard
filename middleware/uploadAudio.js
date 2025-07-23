const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/audio/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueName + file.originalname);
  },
});

module.exports = multer({ storage });
