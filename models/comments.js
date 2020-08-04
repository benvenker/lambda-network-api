const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getCommentByPostId,
};

function get() {
  return db('comments');
}

function getCommentByPostId(postId) {
  return db.raw(
    `
    select (
      select u.email
      from users u
      where u.id = c.user_id
  ),
  *,
  (
    select count(id) as comments
    from comments c
    where c.parent_comment_id = c.id
)
from comments c
where c.post_id = '${postId}'
    `
  );
}
