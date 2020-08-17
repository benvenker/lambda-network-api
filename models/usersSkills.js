const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getByUserId,
  insert,
  remove,
  checkSkillExists,
};

function get() {
  return db('users_skills');
}

function getByUserId(userId) {
  return db('users_skills').where({ user_id: userId });
}

function remove(userSkill) {
  try {
    return db('users_skills').where(userSkill).delete();
  } catch (err) {
    console.log(err);
  }
}

async function checkSkillExists(skillId) {
  const exists = await db('skills').where({ id: skillId });

  if (exists.length === 0) {
    return false;
  } else {
    return true;
  }
}

async function insert(skill) {
  try {
    const exists = await db('users_skills').where({
      user_id: skill.user_id,
      skill_id: skill.skill_id,
    });
    if (exists[0] === undefined) {
      return db('users_skills').insert(
        {
          user_id: skill.user_id,
          skill_id: skill.skill_id,
        },
        'skill_id'
      );
    }
  } catch (err) {
    console.log(err);
  }
}
