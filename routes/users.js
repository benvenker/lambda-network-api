const express = require('express');
const users = require('../models/users.js');

const router = express.Router();

router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

router.get('/followers/:followedId', (req, res) => {
  const { followedId } = req.params;
  console.log(followedId);
  return users
    .getAllUsersAUserIsFollowing(followedId)
    .then(followers => {
      if (followers) {
        console.log(followers);
        res.status(200).json(followers.rows);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
