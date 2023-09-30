require('dotenv').config();
const pool = require('../../db');
const { successMessage, errorMessage, status } = require('../helpers/status');
const { options } = require('./../helpers/options');

exports.getAllJob = async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/positions.json`,
      options
    );
    const data = await response.json();
    const ret = successMessage(data);
    res.status(status.success).send(ret);
  } catch (error) {
    console.error(error.message);
    res.status(status.error).send(errorMessage(error.message));
  }
};

exports.getDetailJob = async (req, res) => {
  const { jobId } = req.params;

  let data;
  try {
    const response = await fetch(
      `${process.env.API_URL}/positions/${jobId}`,
      options
    );
    data = await response.json();
  } catch (error) {
    console.error(error.message);
    res.status(status.error).send(errorMessage(error.message));
    return;
  }

  // validate data if empty
  if (Object.keys(data).length === 0) {
    return res.status(status.notfound).send(errorMessage('Job not available'));
  } else {
    const ret = successMessage(data);
    return res.status(status.success).send(ret);
  }
};
