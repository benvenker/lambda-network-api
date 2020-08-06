const db = require('../data/dbConfig.js');
const UUID = require('uuid-1345');

module.exports = {
  get,
  getAllUsersAUserIsFollowing,
  createUser,
};

function get() {
  return db('users');
}

function getAllUsersAUserIsFollowing(followedId) {
  const followedIdIdentifier = db.ref('followed_id').withSchema('follows');
  return db
    .select('users.email')
    .from('follows')
    .where('follows.follower_id', followedId)
    .join('users', 'users.id', followedIdIdentifier);
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
