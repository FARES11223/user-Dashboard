const Audio = require("../models/audio");

exports.uploadAudio = async (req, res) => {
  try {
    const { title, genre, isPrivate } = req.body;

    const audio = await Audio.create({
      title,
      genre,
      isPrivate: isPrivate,
    });

    res.status(201).json({
      success: true,
      data: {
        id: audio._id,
        title: audio.title,
        genre: audio.genre,
        isPrivate: audio.isPrivate,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
