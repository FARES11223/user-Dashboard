const Audio = require("../models/audio");

// Upload audio (protected route)
exports.uploadAudio = async (req, res) => {
  try {
    const { title, genre } = req.body;

    const audio = await Audio.create({
      title,
      genre,
      filePath: req.file.path,
      owner: req.user._id, // Attach logged-in user as owner
    });

    res.status(201).json({
      success: true,
      data: {
        id: audio._id,
        title: audio.title,
        genre: audio.genre,
        url: `/uploads/audio/${path.basename(audio.filePath)}`, // Public URL
      },
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all audio (protected route)
exports.getAllAudio = async (req, res) => {
  try {
    const audioFiles = await Audio.find()
      .select("title genre createdAt")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: audioFiles.length,
      data: audioFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
