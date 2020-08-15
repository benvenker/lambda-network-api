const express = require('express');
const users = require('../models/users.js');
const { validateUserId } = require('../middleware/usersMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

router.get('/:id', validateUserId(), (req, res) => {
  return res.status(200).json(req.user);
});

// Get a list of the users a user is following
router.get('/:id/following', validateUserId(), (req, res) => {
  const { id } = req.params;
  console.log(id);
  return users
    .getAllUsersAUserIsFollowing(id)
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
