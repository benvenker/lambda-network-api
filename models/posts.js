const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getPostsByUserId,
  insert,
  getById,
  getPostsByUsersAUserFollows,
};

function get() {
  return db('posts');
}

function getById(id) {
  return db('posts').where({ id: id }).first();
}

// Get posts with comment, vote, and award counts
async function getPostsByUserId(userId) {
  const postsIdIdentifier = db.ref('id').withSchema('posts');

  return db
    .select(
      'title',
      'body',
      'created_date',
      function () {
        this.select('email').from('users').where('users.id', userId);
      },
      // votes
      function () {
        this.count('votes.id')
          .from('votes')
          .where('votes.post_id', postsIdIdentifier)
          .as('votes');
      },
      function () {
        this.count('id')
          .from('comments')
          .where('comments.post_id', postsIdIdentifier)
          .as('comments');
      },
      function () {
        this.count('id')
          .from('post_awards')
          .where('post_awards.post_id', postsIdIdentifier)
          .as('awards');
      }
    )
    .from('posts')
    .where('posts.user_id', userId);
}

async function getPostsByUsersAUserFollows(userId) {
  // get the list of userIds to filter  posts on
  const userIds = await db('follows')
    .select('follower_id')
    .where('followed_id', userId);

  const userIdArr = [];
  userIds.map(userId => userIdArr.push(userId.follower_id));

  // just for safety, filter out the user Id we're passing in,
  // so you can't be following yourself
  const filterdUserIdArr = userIdArr.filter(id => id !== userId);

  // Get the list of posts, filtered by those user Ids
  const posts = await db('posts')
    .whereIn('posts.user_id', filterdUserIdArr)
    .orderBy('posts.created_date', 'desc');
  return posts;
}

function insert(post) {
  return db('posts').insert(post, 'id');
}
