const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_CONNECTION); // => from .env file
    console.log("Connected to mongo DB");
  } catch (error) {
    console.log("connection failed", error);
  }
}

module.exports = connectToDB;
