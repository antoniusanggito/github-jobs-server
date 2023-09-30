require('dotenv').config();
const jwt = require('jsonwebtoken');
const { status, errorMessage } = require('./../helpers/status');

const verifyAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.message = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username: decoded.username,
    };
    next();
  } catch (error) {
    errorMessage.message = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

module.exports = verifyAuth;
