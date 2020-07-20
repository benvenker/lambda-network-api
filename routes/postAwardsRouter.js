const express = require('express');
const postAwards = require('../models/postAwardsDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return postAwards
    .get()
    .then(postAwards => res.status(200).json(postAwards))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
