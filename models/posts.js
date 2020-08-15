const db = require('../data/dbConfig.js');
const { getVotesByPostId } = require('../models/votes');
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
  const postsUidIdentifier = db.ref('user_id').withSchema('posts');
  return db
    .select(
      'posts.id',
      'title',
      'body',
      'posts.created_date',
      'posts.image_url as post_image',
      'users.image as user_avatar',
      function () {
        this.select('email')
          .from('users')
          .where('users.id', postsUidIdentifier);
      },
      function () {
        this.count('id')
          .from('comments')
          .where('comments.post_id', id)
          .as('comments');
      },
      function () {
        this.count('id')
          .from('post_awards')
          .where('post_awards.post_id', id)
          .as('awards');
      }
    )
    .from('posts')
    .where('posts.id', id)
    .join('users', 'posts.user_id', 'users.id');
}

// Get posts with comment, vote, and award counts
async function getPostsByUserId(userId) {
  const postsIdIdentifier = db.ref('id').withSchema('posts');

  return db
    .select(
      'posts.id',
      'title',
      'body',
      'posts.created_date',
      'posts.image_url as post_image',
      'users.image as avatar',
      function () {
        this.select('email').from('users').where('users.id', userId);
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
    .where('posts.user_id', userId)
    .join('users', 'posts.user_id', 'users.id')
    .orderBy('posts.created_date', 'desc');
}

async function getPostsByUsersAUserFollows(userId) {
  const postsIdIdentifier = db.ref('id').withSchema('posts');

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
  const posts = await db
    .select(
      'posts.id',
      'user_id',
      'title',
      'body',
      'posts.created_date',
      'image_url',
      'link',
      'users.email',
      'users.image',
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
    .whereIn('posts.user_id', filterdUserIdArr)
    .join('users', 'users.id', '=', 'posts.user_id')
    .orderBy('posts.created_date', 'desc');
  return posts;
}

function insert(post) {
  return db('posts').insert(post, 'id');
}
