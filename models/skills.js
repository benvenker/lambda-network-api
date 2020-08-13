const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert,
  getSkillByName,
};

function get() {
  return db('skills');
}

function getSkillByName(name) {
  const inputName = name.toLowerCase();
  return db('skills').where({ name: inputName });
}

function insert(skill) {
  try {
    return db('skills').insert(skill, 'id');
  } catch (err) {
    console.log(err);
  }
}
