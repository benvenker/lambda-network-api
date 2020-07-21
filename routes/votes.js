const express = require('express');
const votes = require('../models/votes.js');

const router = express.Router();

router.get('/', (req, res) => {
  return votes
    .get()
    .then(votes => res.status(200).json(votes))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
