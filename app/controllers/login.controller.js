const { generateToken } = require('../helpers/token');
const pool = require('./../../db');
const { successMessage, errorMessage, status } = require('./../helpers/status');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(status.unauthorized).send(errorMessage('Credential invalid'));
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
    console.error(error.message);
    res.status(status.error).send(errorMessage(error.message));
    return;
  }

  if (!user) {
    res.status(status.unauthorized).send(errorMessage('Username is invalid'));
    return;
  }

  // validate password
  bcrypt.compare(password, user.password, (err, data) => {
    if (err) {
      res.status(status.error).send(errorMessage('Server error'));
      return;
    }
    if (data) {
      const token = generateToken(user.username);
      const ret = successMessage({
        username: user.username,
        token,
      });
      res.status(status.success).send(ret);
    } else {
      res.status(status.unauthorized).send(errorMessage('Password is invalid'));
    }
  });
};
