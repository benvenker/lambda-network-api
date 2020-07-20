const express = require('express');
const usersSkills = require('../models/usersSkillsDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return usersSkills
    .get()
    .then(usersSkills => res.status(200).json(usersSkills))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
