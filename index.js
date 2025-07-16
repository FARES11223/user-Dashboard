const dotenv = require("dotenv");
const connectToD = require("./config/DBConnection");
dotenv.config();
const express = require("express");
connectToD();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
