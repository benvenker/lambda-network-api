const express = require('express');
const skills = require('../models/skills.js');
const UUID = require('uuid-1345');
const { getSkillByName } = require('../models/skills.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  return skills
    .get()
    .then(skills => res.status(200).json(skills))
    .catch(err => next(err));
});

router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).json({ message: 'Please include a name' });
    } else {
      const skill = await skills.getSkillByName(name);
      return res.status(200).json(skill);
    }
  } catch (err) {
    res.status(500).json({ message: 'Name could not be retrieved' });
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  return skills
    .getById(id)
    .then(skill => {
      if (skill) {
        return res.status(200).json(skill);
      } else {
        return res.status(400).json({ message: 'Skill not found' });
      }
    })
    .catch(err => next(err));
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'you must provide a skill' });
  } else if (getSkillByName(name).length > 0) {
    res.status(422).json({ message: 'The skill already exists' });
  } else {
    const skill = {
      name: name.toLowerCase(),
      id: UUID.v4(),
    };
    try {
      const newSkill = await skills.insert(skill);
      return res
        .status(201)
        .json({ message: 'new skill added', id: newSkill[0] });
    } catch (err) {
      if ((err.code = '23505')) {
        res.status(400).json({ message: 'The skill already exists' });
      } else {
        res
          .status(500)
          .json({ message: 'There was an error adding the skill' });
      }
    }
  }
});

module.exports = router;
