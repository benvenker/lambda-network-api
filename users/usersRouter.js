const express = require('express');
const users = require('./usersDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return users
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => console.log(err));
});

module.exports = router;
