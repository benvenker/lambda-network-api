const express = require('express');
const usersSkills = require('../models/usersSkills.js');
const { insert } = require('../data/dbConfig.js');
const { getByUserId } = require('../models/usersSkills.js');
const { validateSkillId } = require('../middleware/skillsMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
  return usersSkills
    .get()
    .then(usersSkills => res.status(200).json(usersSkills))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/users/:id', (req, res) => {
  return usersSkills
    .getByUserId()
    .then(usersSkills => res.status(200).json(usersSkills))
    .catch(err => res.status(500).json({ msg: err }));
});

// Insert array of posts, even one id should come in an array
router.post('/:userId', async (req, res, next) => {
  const skills = req.body;
  const userId = req.params.userId;

  const newSkills = async () => {
    return Promise.all(
      skills.map(async skill => {
        if (await usersSkills.checkSkillExists(skill)) {
          const newSkillId = await usersSkills.insert({
            user_id: userId,
            skill_id: skill,
          });
          return newSkillId;
        } else {
        }
      })
    );
  };
  await newSkills();
  return usersSkills
    .getByUserId(userId)
    .then(data => res.status(200).json(data));
});

module.exports = router;
