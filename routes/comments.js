const express = require('express');
const comments = require('../models/comments.js');

const router = express.Router();

router.get('/', (req, res) => {
  return comments
    .get()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/post/:postId', (req, res) => {
  const { postId } = req.params;
  return comments
    .getCommentByPostId(postId)
    .then(comment => {
      if (comment) {
        console.log(comment);
        res.status(200).json(comment);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
