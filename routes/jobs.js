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
    .then(id => res.status(200).json({ id: id[0] }))
    .catch(err => next(err));
});

// Search for jobs
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).json({ message: 'Please include a name' });
    } else {
      console.log('test from else');
      const job = await jobs.getJobByName(name);
      return res.status(200).json(job);
    }
  } catch (err) {
    res.status(500).json({ message: 'Name could not be retrieved' });
  }
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
