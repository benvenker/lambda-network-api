const db = require('../data/dbConfig.js');
const UUID = require('uuid-1345');

module.exports = {
  get,
  getById,
  insert,
  update,
};

function get() {
  return db('jobs');
}

function insert(job) {
  return db('jobs').insert(
    {
      ...job,
      id: UUID.v4(),
    },
    'id'
  );
}

function update(job) {
  return db('jobs').where({ id: job.id }).update(job);
}

function getById(id) {
  return db('jobs').where({ id }).first();
}
