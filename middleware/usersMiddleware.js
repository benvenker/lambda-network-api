const users = require('../models/users');

module.exports = {
  validateUserId,
};

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: 'User not found.',
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
