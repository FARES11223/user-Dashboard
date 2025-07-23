const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    audioFile: String,
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
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
