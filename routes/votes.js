const express = require('express');
const votes = require('../models/votes.js');

const router = express.Router();

router.get('/', (req, res) => {
  return votes
    .get()
    .then(votes => res.status(200).json(votes))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/post/:id', (req, res) => {
  return votes
    .getVotesByPostId(req.params.id)
    .then(votes => {
      console.log(votes);
      if (votes) {
        res.status(200).json(votes);
      }
    })
    .catch(err => res.status(500).json({ message: `Error: ${err}` }));
});

module.exports = router;
