const express = require('express');
const jobs = require('../models/jobs.js');
const { orWhereNotExists } = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  return jobs
    .get()
    .then(jobs => res.status(200).json(jobs))
    .catch(err => res.status(500).json({ msg: err }));
});

// Create a new job
router.post('/', (req, res, next) => {
  const job = req.body;
  return jobs
    .insert(job)
    .then(job => res.status(200).json(res))
    .catch(err => next(err));
});

// Get a job by ID
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  return jobs
    .getById(id)
    .then(job => res.status(200).json(job))
    .catch(err => next(err));
});

module.exports = router;
