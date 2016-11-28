'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../../db/models');
const User = models.User;
module.exports = router;

router.get('/:id', function (req, res, next) {
  console.log('req.params.id', req.params.id);
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(next);
});
