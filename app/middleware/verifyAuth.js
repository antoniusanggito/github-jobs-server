require('dotenv').config();
const jwt = require('jsonwebtoken');
const { status, errorMessage } = require('./../helpers/status');

const verifyAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(status.unauthorized).send(errorMessage('Token is invalid'));
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username: decodedToken.username,
    };
    next();
  } catch (error) {
    res.status(status.unauthorized).send(errorMessage('Token is invalid'));
    return;
  }
};

module.exports = verifyAuth;
