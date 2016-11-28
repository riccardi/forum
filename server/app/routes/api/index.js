'use strict';

const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
