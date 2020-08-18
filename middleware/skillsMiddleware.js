const skills = require('../models/skills');

module.exports = {
  validateSkillId,
};

function validateSkillId() {
  return (req, res, next) => {
    skills
      .getById(req.params.id)
      .then(skill => {
        if (skill) {
          req.skill = skill;
          next();
        } else {
          res.status(404).json({
            message: 'Skill not found.',
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Server error',
        });
      });
  };
}
