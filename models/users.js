const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getFollowersByFollowedId,
};

function get() {
  return db('users');
}

function getFollowersByFollowedId(followedId) {
  return db.raw(
    `
    select u.email
from follows f
join users u on u.id = f.followed_id
where f.follower_id = '${followedId}'
    `
  );
}
