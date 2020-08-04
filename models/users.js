const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getAllUsersAUserIsFollowing,
};

function get() {
  return db('users');
}

// function getAllUsersAUserIsFollowing(followedId) {
//   return db.raw(
//     `
//     select u.email
// from follows f
// join users u on u.id = f.followed_id
// where f.follower_id = '${followedId}'
//     `
//   );
// }

function getAllUsersAUserIsFollowing(followedId) {
  const followedIdIdentifier = db.ref('followed_id').withSchema('follows');
  return db
    .select('users.email')
    .from('follows')
    .where('follows.follower_id', followedId)
    .join('users', 'users.id', followedIdIdentifier);
}
