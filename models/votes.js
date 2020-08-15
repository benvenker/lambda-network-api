const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getVotesByPostId,
};

function get() {
  return db('votes');
}

async function getVotesByPostId(id) {
  try {
    const upvotes = await db
      .count('id')
      .from('votes')
      .where({ post_id: id, upvote: true });

    const downvotes = await db
      .count('id')
      .from('votes')
      .where({ post_id: id, upvote: false });

    const votes = Number(upvotes[0].count) - Number(downvotes[0].count);
    return { votes };
  } catch (err) {}
}
