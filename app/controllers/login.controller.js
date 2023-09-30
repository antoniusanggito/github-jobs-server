const { generateToken } = require('../helpers/token');
const pool = require('./../../db');
const { successMessage, errorMessage, status } = require('./../helpers/status');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  if (!req.body) {
    errorMessage.message = 'Credential invalid';
    res.status(status.unauthorized).send(errorMessage);
    return;
  }
  const { username, password } = req.body;

  // validate user
  let user;
  const getUserQuery = `
      SELECT * FROM users 
      WHERE username=$1;
    `;
  const values = [username];
  try {
    const { rows } = await pool.query(getUserQuery, values);
    user = rows[0];
  } catch (error) {
    console.error('Error query db:', error.message);
    errorMessage.message = error.message;
    res.status(status.error).send(errorMessage);
    return;
  }

  if (!user) {
    errorMessage.message = 'Username is invalid';
    res.status(status.unauthorized).send(errorMessage);
    return;
  }

  // validate password
  bcrypt.compare(password, user.password, (err, ret) => {
    if (err) {
      errorMessage.message = 'Server error';
      res.status(status.error).send(errorMessage);
      return;
    }
    if (ret) {
      const token = generateToken(user.username);
      successMessage.data.username = user.username;
      successMessage.data.token = token;
      res.status(status.success).send(successMessage);
    } else {
      errorMessage.message = 'Password does not match';
      res.status(status.unauthorized).send(errorMessage);
    }
  });
};
