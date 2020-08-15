const express = require('express');
const users = require('../models/users.js');
const { validateUserId } = require('../middleware/usersMiddleware');
const UUID = require('uuid-1345');

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

// Create a new user
router.post('/', async (req, res) => {
  if (req.body) {
    const user = {
      id: UUID.v4(),
      created_date: new Date(),
      permission_type: 'user',
      ...req.body,
    };
    try {
      const newUser = await users.insert(user);
      return res.status(200).json({ id: newUser[0] });
    } catch (err) {
      return res.status(500).json({ message: `Error creating user: ${err}` });
    }
  } else {
    res.status(400).json({ message: 'No user body was provided' });
  }
});

router.get('/');

module.exports = router;
