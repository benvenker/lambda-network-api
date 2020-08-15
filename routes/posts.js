const express = require('express');
const posts = require('../models/posts.js');
const UUID = require('uuid-1345');

const router = express.Router();

router.get('/', (req, res) => {
  return posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  return posts
    .getPostsByUserId(userId)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/:id', (req, res) => {
  console.log('ehllo');
  return posts
    .getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: 'No post found' });
      }
    })
    .catch(err => res.status(500).json({ message: `Server error: ${err}` }));
});

router.post('/', async (req, res) => {
  if (req.body) {
    const post = {
      id: UUID.v4(),
      created_date: new Date(),
      ...req.body,
    };
    try {
      const newPost = await posts.insert(post);
      return res.status(200).json({ id: newPost[0] });
    } catch (err) {
      return res.status(500).json({ message: `Error creating post: ${err}` });
    }
  } else {
    res.status(400).json({ message: 'No post body was provided' });
  }
});

module.exports = router;
