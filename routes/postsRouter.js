const express = require('express');
const posts = require('../models/postsDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
