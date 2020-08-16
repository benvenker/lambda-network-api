const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
};

function get() {
  return db('jobs');
}

function getById(id) {
  return db('jobs').where({ id }).first();
}
