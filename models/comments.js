const db = require('../data/dbConfig.js');
const { post } = require('../routes/users.js');

module.exports = {
  get,
  getCommentsByPostId,
  getCommentsByUserId,
  getCommentsCountByPostId,
};

function get() {
  return db('comments');
}

function getCommentsCountByPostId(postId) {
  return db.count('id').from('comments').where({ post_id: postId });
}

// * bens working solution
function getCommentsByPostId(postId) {
  const commentsIdIdentifier = db.ref('id').withSchema('comments');
  const commentsUserIdIdentifier = db.ref('user_id').withSchema('comments');
  const postIdentifier = db.ref('post_id').withSchema('comments');
  const postUserIdIdentifier = db.ref('user_id').withSchema('posts');
  const userIdentifier = db.ref('id').withSchema('users');
  console.log(postId);
  return db('comments')
    .select(
      function () {
        this.select('posts.body as post')
          .from('posts')
          .where('posts.id', postIdentifier);
      },
      'posts.created_date as post created on',
      'posts.title',
      'posts.link',
      function () {
        this.select('email as posted by')
          .from('users')
          .where('users.id', postUserIdIdentifier);
      },
      function () {
        this.select('email')
          .from('users')
          .where('users.id', commentsUserIdIdentifier)
          .as('comment by');
      },
      'comments.body as comment',
      'comments.created_date as comment created on',
      // this is selecting the number of comments that the comment of the post has
      function () {
        this.count('id')
          .as('comments on comment')
          .from('comments')
          .where('comments.parent_comment_id', commentsIdIdentifier);
      }
    )
    .from('comments')
    .where('comments.post_id', postId)
    .join('posts', 'posts.id', 'comments.post_id');
}

function getCommentsByUserId(userId) {
  return db
    .select(
      'comments.id',
      'users.email',
      'comments.body',
      'comments.created_date'
    )
    .from('comments')
    .where('comments.user_id', userId)
    .join('users', 'users.id', 'comments.user_id');
}
// -- Get comments by userId
// select * from comments where comments.user_id = 'dbe86e29-34d6-436a-bb98-3e71fc65a24c';
