// utils/errorHandler.js
exports.sendErrorForDev = (err, res) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
