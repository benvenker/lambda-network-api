const express = require('express');
const users = require('../models/users.js');
const dbConfig = require('../data/dbConfig.js');

const router = express.Router();

// Get a list of all the users
router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'Server error' }));
});

// Get an individual user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  return users
    .getUserById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'No user found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json({ message: `Server error` }));
});

// Get all users a user is following
router.get('/:userId/following', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  return users
    .getAllUsersAUserIsFollowing(userId)
    .then(followers => {
      if (!followers) {
        res.status(404).json({ message: 'No followers found' });
      } else if (followers) {
        console.log(followers);
        res.status(200).json(followers);
      }
    })
    .catch(err => res.status(500).json({ message: `Server error` }));
});

// Get the count of all the users a user is following
router.get('/:userId/following-count', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  return users
    .getCountOfAllAUsersFollowers(userId)
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
router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404).json({ message: 'Please include a email' });
  } else {
    return users
      .createUser(email)
      .then(user => {
        if (user) {
          console.log(user);
          res
            .status(200)
            .json({ message: `user successfully created!`, userId: user[0] });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `User creation encounted an error` });
      });
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
