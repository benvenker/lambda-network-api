const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getPostsByUserId,
};

function get() {
  return db('posts');
}

/*
-- Get posts with comment, vote, and award counts
select
    *,
    (select u.email from users u where u.id = posts.user_id),
    (select count(id) as votes from votes v where v.post_id = posts.id),
    (select count(id) as comments from comments c where c.post_id = posts.id),
    (select count(id) as awards from post_awards a where a.post_id = posts.id)

from posts where user_id = 'dbe86e29-34d6-436a-bb98-3e71fc65a24c'

*/
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
