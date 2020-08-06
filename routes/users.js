const express = require('express');
const users = require('../models/users.js');
const dbConfig = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

// router.get('/:id' (req, res) => {

// })

router.get('/following/:followedId', (req, res) => {
  const { followedId } = req.params;
  console.log(followedId);
  return users
    .getAllUsersAUserIsFollowing(followedId)
    .then(followers => {
      if (followers) {
        console.log(followers);
        res.status(200).json(followers);
      }
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404).json({ message: 'Please include a email' });
  }
  return users
    .createUser(email)
    .then(user => {
      if (user) {
        console.log(user);
        res.status(200).json(user);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
