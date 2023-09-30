require('dotenv').config();
const pool = require('../../db');
const { successMessage, errorMessage, status } = require('../helpers/status');
const { options } = require('./../helpers/options');

exports.getAllJob = async (req, res) => {
  const { description, location, full_time, page = 1 } = req.query;

  let data;
  try {
    const response = await fetch(
      `${process.env.API_URL}/positions.json`,
      options
    );
    data = await response.json();
  } catch (error) {
    console.error(error.message);
    res.status(status.error).send(errorMessage(error.message));
    return;
  }

  let filtered = data;
  if (description) {
    filtered = filtered.filter((job) => {
      return (
        job.description.toLowerCase().indexOf(description.toLowerCase()) !== -1
      );
    });
  }

  if (location) {
    filtered = filtered.filter((job) => {
      return job.location.toLowerCase().indexOf(location.toLowerCase()) !== -1;
    });
  }

  if (full_time) {
    filtered = filtered.filter((job) => {
      return full_time === 'true'
        ? job.type === 'Full Time'
        : full_time === 'false'
        ? job.type !== 'Full Time'
        : true;
    });
  }

  filtered = filtered.slice((page - 1) * 5, page * 5);

  const ret = successMessage(filtered);
  res.status(status.success).send(ret);
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
    res.status(status.notfound).send(errorMessage('Job not available'));
  } else {
    const ret = successMessage(data);
    res.status(status.success).send(ret);
  }
};
