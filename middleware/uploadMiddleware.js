const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/profiles/",
    filename: (req, file, cb) => {
      cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

module.exports = upload;
