const express = require('express');
const posts = require('../models/posts.js');

const router = express.Router();

router.get('/', (req, res) => {
  return posts
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  return posts
    .getPostsByUserId(userId)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
