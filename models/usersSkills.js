const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getByUserId,
  insert,
  checkSkillExists,
};

function get() {
  return db('users_skills');
}

function getByUserId(userId) {
  console.log('getByUserId');
  return db('users_skills').where({ user_id: userId });
}

async function checkSkillExists(skillId) {
  const exists = await db('skills').where({ id: skillId });

  if (exists.length === 0) {
    // console.log(exists);
    return false;
  } else {
    return true;
  }
}

async function insert(skill) {
  // console.log('from insert: ');
  try {
    const exists = await db('users_skills').where({
      user_id: skill.user_id,
      skill_id: skill.skill_id,
    });
    if (exists[0] === undefined) {
      return db('users_skills').insert({
        user_id: skill.user_id,
        skill_id: skill.skill_id,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
