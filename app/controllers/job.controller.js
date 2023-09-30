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
    successMessage.data = data;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.error(error.message);
    errorMessage.message = error.message;
    res.status(status.error).send(errorMessage);
  }
};

exports.getDetailJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const response = await fetch(
      `${process.env.API_URL}/positions/${jobId}`,
      options
    );
    const data = await response.json();

    // manual validate data is empty
    if (Object.keys(data).length === 0) {
      errorMessage.message = 'Job not found';
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = data;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.error(error.message);
    errorMessage.message = error.message;
    res.status(status.error).send(errorMessage);
  }
};