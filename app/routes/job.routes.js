const job = require('../controllers/job.controller.js');
const verifyAuth = require('../middleware/verifyAuth.js');
const router = require('express').Router();

module.exports = (app) => {
  router.get('/', verifyAuth, job.getAllJob);
  router.get('/:jobId', verifyAuth, job.getDetailJob);

  app.use('/job', router);
};
