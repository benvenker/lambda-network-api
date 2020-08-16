const express = require('express');
const users = require('../models/users.js');
const dbConfig = require('../data/dbConfig.js');
const { validateUserId } = require('../middleware/usersMiddleware');
const UUID = require('uuid-1345');

const router = express.Router();

// Get a list of all the users
router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'Server error' }));
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
      if (!followers) {
        res.status(404).json({ message: 'No followers found' });
      } else if (followers) {
        console.log(followers);
        res.status(200).json(followers);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Server error: ${err}` });
    });
});

// This is a partial function that got lost in a merge somehow...need
// to handle appropriately
// // Get the count of all the users a user is following
// router.get('/:userId/following-count', (req, res) => {
//   const { userId } = req.params;
//   console.log(userId);
//   return users
//     .getCountOfAllAUsersFollowers(userId)
// Get all of a user's followers
router.get('/:userId/followers', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  return users
    .getAllAUsersFollowers(userId)
    .then(followers => {
      if (!followers) {
        res.status(404).json({ message: 'No followers found' });
      } else if (followers) {
        res.status(200).json(followers);
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Server error` });
    });
});

// Get the count of all of a user's followers
router.get('/:userId/followers-count', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  return users
    .getCountOfAllAUsersFollowers(userId)
    .then(followers => {
      if (!followers) {
        res.status(404).json({ message: 'No followers found' });
      } else if (followers) {
        res.status(200).json(followers);
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Server error ${err}` });
    });
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await users.getUserById(id);
  const body = {
    id: id,
    ...req.body,
  };
  if (!user) {
    res.status(404).json({ message: 'No user was found' });
  } else {
    return users
      .updateProfileData(body)
      .then(profile => {
        if (!profile) {
          res.status(404).json({ message: 'No profile found' });
        } else {
          res.status(200).json(profile);
        }
      })
      .catch(err => res.status(500).json({ message: 'Server error' }));
  }
});

module.exports = router;
