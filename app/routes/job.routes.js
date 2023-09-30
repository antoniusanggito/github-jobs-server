module.exports = (app) => {
  const job = require('../controllers/job.controller.js');
  var router = require('express').Router();

  router.get('/', job.getAllJob);
  router.get('/:jobId', job.getDetailJob);

  app.use('/job', router);
};
