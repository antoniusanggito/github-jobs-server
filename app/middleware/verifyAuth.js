require('dotenv').config();
const jwt = require('jsonwebtoken');
const { status, errorMessage } = require('./../helpers/status');

const verifyAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(status.bad).send(errorMessage('Token not provided'));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username: decodedToken.username,
    };
    next();
  } catch (error) {
    return res
      .status(status.unauthorized)
      .send(errorMessage('Authentication Failed'));
  }
};

module.exports = verifyAuth;
