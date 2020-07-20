const express = require('express');
const commentFlags = require('./commentFlagsDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  return commentFlags
    .get()
    .then(commentFlags => res.status(200).json({ commentFlags }))
    .catch(err => res.status(500).json({ msg: err }));
});

module.exports = router;
