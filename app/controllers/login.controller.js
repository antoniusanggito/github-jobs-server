const { generateToken } = require('../helpers/token');
const pool = require('./../../db');
const { successMessage, errorMessage, status } = require('./../helpers/status');

exports.login = async (req, res) => {
  if (!req.body) {
    errorMessage.message = 'Credential invalid';
    return res.status(status.unauthorized).send(errorMessage);
  }
  const { username, password } = req.body;

  // validate user
  const getUserQuery = `
    SELECT username FROM users 
    WHERE username=$1;
  `;
  const values = [username];

  try {
    const { rows } = await pool.query(getUserQuery, values);
    const user = rows[0];
    const token = generateToken(user.username);
    successMessage.data = user;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.error(error.message);
    errorMessage.message = 'Credential invalid';
    res.status(status.error).send(errorMessage);
  }
};
