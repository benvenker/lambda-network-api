const db = require('../data/dbConfig.js');
const { post } = require('../routes/users.js');

module.exports = {
  get,
  getCommentByPostId,
};

function get() {
  return db('comments');
}

// function getCommentByPostId(postId) {
//   return db.raw(
//     `
//     select (
//       select u.email
//       from users u
//       where u.id = c.user_id
//   ),
//   *,
//   (
//     select count(id) as comments
//     from comments c
//     where c.parent_comment_id = c.id
// )
// from comments c
// where c.post_id = '${postId}'
//     `
//   );
// }

function getCommentByPostId(postId) {
  const comments = db('comments')
    .join('users', 'user_id', 'comments.user_id')
    .where('comments.post_id', postId)
    .select('email', '*');
  return comments;
}
// * working code to return child comment count
const childComments = db('comments')
  .count('id as comments')
  .where('comments.parent_comment_id', function () {
    this.select('id').from('comments').where('comments.id', postId);
  });
