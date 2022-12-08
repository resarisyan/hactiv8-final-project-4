const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign(payload, secret);

  return token;
};

const verifyToken = (token) => {
  const decodeToken = jwt.verify(token, secret);

  return decodeToken;
};

module.exports = {
  generateToken,
  verifyToken,
};
