const db = require('../data/dbConfig.js');
const UUID = require('uuid-1345');

module.exports = {
  get,
  insert,
  getById,
  getAllUsersAUserIsFollowing,
  getAllAUsersFollowers,
  getCountOfAllAUsersFollowers,
  getCountOfAllUsersAUserIsFollowing,
  createUser,
  updateProfileData,
};

function get() {
  return db('users');
}

function getById(id) {
  return db
    .select('*', 'jobs.name')
    .from('users')
    .where('users.id', id)
    .join('jobs', 'users.job_id', 'jobs.id');
}

function insert(user) {
  return db('users').insert(user, 'id');
}

// function getById(id) {
//   return db('users').where({ id: id }).first();
// }

/**
 *
 * @param {uuid} userId The id of the "followed" user. In this case we're
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

function getCountOfAllUsersAUserIsFollowing(followedId) {
  const followedIdIdentifier = db.ref('followed_id').withSchema('follows');
  return db
    .count('users.email')
    .from('follows')
    .where('follows.follower_id', followedId)
    .join('users', 'users.id', followedIdIdentifier);
}

function getAllAUsersFollowers(followerId) {
  const followerIdIdentifier = db.ref('follower_id').withSchema('follows');
  return db
    .select('users.email')
    .from('follows')
    .where('follows.followed_id', followerId)
    .join('users', 'users.id', followerIdIdentifier);
}

function getCountOfAllAUsersFollowers(followerId) {
  const followerIdIdentifier = db.ref('follower_id').withSchema('follows');
  return db
    .count('users.email')
    .from('follows')
    .where('follows.followed_id', followerId)
    .join('users', 'users.id', followerIdIdentifier);
}

function createUser(email) {
  const user = {
    id: UUID.v4(),
    email: email,
    created_date: new Date(),
    permission_type: 'user',
  };

  return db('users')
    .where({ email: user.email })
    .then(rows => {
      if (rows.length === 0) {
        // no matching user records found
        return db('users').insert(user, 'id');
      } else {
        throw new Error('The user already exists :)');
      }
    })
    .catch(err => console.log(err));
}

function updateProfileData(profileData) {
  const { id } = profileData;

  return db('users').update(profileData).where({ id });
}
