const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert,
  getById,
  getSkillByName,
  checkForExistingSkillsAndAddNewSkills,
};

function get() {
  return db('skills');
}

function getById(id) {
  return db('skills').where({ id });
}

function getSkillByName(name) {
  const inputName = name.toLowerCase();
  return db.select('*').from('skills').where('name', 'like', `%${inputName}%`);
}

function insert(skill) {
  try {
    return db('skills').insert(skill, 'id');
  } catch (err) {
    console.log(err);
  }
}

function getExactMatch(skillName) {
  const inputName = skillName.toLowerCase();
  return db.select('*').from('skills').where('name', inputName);
}

async function checkForExistingSkillsAndAddNewSkills(skills) {
  let matchedSkills = [];
  try {
    return skills.map(async skill => {
      const id = await db.select('*').from('skills').where('name', skill);
      console.log(id[0]);
      if (id !== []) {
        matchedSkills.push(id[0]);
      }
      console.log(matchedSkills);
    });
  } catch (err) {
    console.log(err);
  }
  // console.log(matchedSkills.filter(skill => skill === undefined));
  // return matchedSkills.filter(skill => skill === undefined);
}

function getUsersSkills(userId) {}
