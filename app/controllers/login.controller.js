// const db = require("../models");
const pool = require('./../../db');

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(401).send({
      error: 'invalid_request',
      error_description: 'Invalid Request',
    });
    return;
  }

  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username=$1;', [
      username,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: 'server_error',
      error_description: 'Internal Server Error',
    });
  }
};
