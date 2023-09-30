require('dotenv').config();
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
  if (description && description !== '') {
    filtered = filtered.filter((job) => {
      return (
        job.title.toLowerCase().indexOf(description.toLowerCase()) !== -1 ||
        job.company.toLowerCase().indexOf(description.toLowerCase()) !== -1 ||
        job.description.toLowerCase().indexOf(description.toLowerCase()) !== -1
      );
    });
  }

  if (location && location !== '') {
    filtered = filtered.filter((job) => {
      return job.location.toLowerCase().indexOf(location.toLowerCase()) !== -1;
    });
  }

  if (full_time && full_time === 'true') {
    filtered = filtered.filter((job) => {
      return full_time === 'true';
    });
  }

  // Set pagination 5 per page
  filteredPage = filtered.slice((page - 1) * 5, page * 5);

  const ret = successMessage({ total: filtered.length, jobs: filteredPage });
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
