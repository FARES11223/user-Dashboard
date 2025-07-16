const mongoose = requre("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: ["String", "Enter valid text"],
    required: [true, "must enter email"],
    minlength: [3, "too short name"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: [6, "too short password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
