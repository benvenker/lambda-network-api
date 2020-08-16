const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert,
  getById,
  getSkillByName,
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

function getUsersSkills(userId) {}
