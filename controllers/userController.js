const User = require("../models/user");
const { sendErrorForDev } = require("../utils/errorHandler");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    sendErrorForDev(err, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      req.user._id.toString() !== req.params.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(user);
  } catch (err) {
    sendErrorForDev(err, res);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, userImage } = req.body;
    let updateData = { name, email, userImage };

    // Find user first to check permissions
    const userToUpdate = await User.findById(req.params.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current user is either the user being updated or an admin
    if (req.userId !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Only allow password update if it's the user themselves (not admin)
    if (req.body.password && req.userId === req.params.id) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, select: "-password" }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    sendErrorForDev(err, res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    sendErrorForDev(err, res);
  }
};
