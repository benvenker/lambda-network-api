const db = require('../data/dbConfig.js');
const { getVotesByPostId } = require('./votes.js');
const UUID = require('uuid-1345');

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

async function getExactMatch(skillName) {
  // const inputName = skillName.toLowerCase();
  return await db.select('*').from('skills').where('name', skillName);
}

async function checkForExistingSkillsAndAddNewSkills(skills) {
  const getExistingSkillsIds = async () => {
    return Promise.all(
      skills.map(async skill => {
        const skillForId = await getExactMatch(skill);
        if (skillForId[0] === undefined) {
          return await insert({ name: skill, id: UUID.v4() }).catch(err => err);
        } else {
          return skillForId[0].id;
        }
      })
    );
  };

  return getExistingSkillsIds().then(data => data);
}

function getUsersSkills(userId) {}
