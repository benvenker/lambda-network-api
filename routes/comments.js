const express = require('express');
const comments = require('../models/comments.js');

const router = express.Router();

router.get('/', (req, res) => {
  return comments
    .get()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
