// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name too short"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [6, "Password too short"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  userImage: {
    type: String,
    required: [true, "User image required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
