const express = require('express');
const follows = require('../models/follows.js');

const router = express.Router();

router.get('/', (req, res) => {
  return follows
    .get()
    .then(follows => res.status(200).json(follows))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
