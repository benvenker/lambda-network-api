const express = require('express');
const users = require('../models/users.js');

const router = express.Router();

router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
  return users
    .getById(req.params.id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(400).json({ message: 'No user found' });
      }
    })
    .catch(err => res.status(500).json({ message: `Server error: ${err}` }));
});

// Get a list of the users a user is following
router.get('/:userId/following', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  return users
    .getAllUsersAUserIsFollowing(userId)
    .then(followers => {
      if (followers) {
        console.log(followers);
        res.status(200).json(followers);
      }
    })
    .catch(err => console.log(err));
});

router.get('/');

module.exports = router;
