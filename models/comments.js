const db = require('../data/dbConfig.js');
const { post } = require('../routes/users.js');

module.exports = {
  get,
  getCommentByPostId,
};

function get() {
  return db('comments');
}

// * bens working solution
function getCommentByPostId(postId) {
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
