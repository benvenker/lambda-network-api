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
        res
          .status(200)
          .json({ message: `user successfully created!`, userId: user[0] });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `User creation encounted an error: ${err}` });
    });
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
  }

  return users.updateProfileData(body).then(profile => {
    if (!profile) {
      res.status(500).json({ message: 'Error updating profile' });
    } else {
      res.status(200).json(profile);
    }
  });
});

module.exports = router;
