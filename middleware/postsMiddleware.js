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
          console.log(post);
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: 'Post not found.',
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Server error',
        });
      });
  };
}
