require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (username) => {
  const token = jwt.sign(
    {
      username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  generateToken,
};
