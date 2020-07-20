const express = require('express');
const awards = require('../models/awardsDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return awards
    .get()
    .then(awards => res.status(200).json({ awards }))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
