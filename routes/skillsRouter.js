const express = require('express');
const skills = require('../models/skillsDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return skills
    .get()
    .then(skills => res.status(200).json(skills))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
