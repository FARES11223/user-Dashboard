const mongoose = require("mongoose");

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

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: ALLOWED_GENRES,
      lowercase: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audio", audioSchema);
