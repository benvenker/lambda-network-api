const express = require('express');
const jobs = require('../models/jobs.js');

const router = express.Router();

router.get('/', (req, res) => {
  return jobs
    .get()
    .then(jobs => res.status(200).json(jobs))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
