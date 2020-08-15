const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert,
  getById,
  getAllUsersAUserIsFollowing,
};

function get() {
  return db('users');
}

function insert(user) {
  return db('users').insert(user, 'id');
}

function getById(id) {
  return db('users').where({ id: id }).first();
}

/**
 *
 * @param {uuid} followedId The id of the "followed" user. In this case we're
 * retrieving all of the users who "followed" the userId being passed in (the
 * userId).
 */
function getAllUsersAUserIsFollowing(userId) {
  const userIdIdentifier = db.ref('followed_id').withSchema('follows');
  return db
    .select('users.email')
    .from('follows')
    .where('follows.follower_id', userId)
    .join('users', 'users.id', userIdIdentifier);
}
