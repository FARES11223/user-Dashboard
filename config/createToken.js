const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.EXPIRE_DATE,
  });
};
