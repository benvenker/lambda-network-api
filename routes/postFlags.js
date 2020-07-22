const express = require('express');
const postFlags = require('../models/postFlags.js');

const router = express.Router();

router.get('/', (req, res) => {
  return postFlags
    .get()
    .then(postFlags => res.status(200).json(postFlags))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
