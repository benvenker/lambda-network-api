const posts = require('../models/posts');

module.exports = {
  validatePostId,
};

function validatePostId() {
  return (req, res, next) => {
    posts
      .getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: 'Post not found.',
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Server error',
        });
      });
  };
}
