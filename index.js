const dotenv = require("dotenv");
const connectToD = require("./config/DBConnection");
dotenv.config();
const express = require("express");
const userRoute = require("./routes/user.routes");
const audioRoute = require("./routes/audio.routes");
const { sendErrorForDev } = require("./utils/errorHandler");
connectToD();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/", audioRoute);

app.use((err, req, res, next) => {
  sendErrorForDev(err, res);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
