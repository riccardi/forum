'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../../db/models');
const Post = models.Post;
const Comment = models.Comment;
const User = models.User;
module.exports = router;


router.get('/', (req, res, next) => {
  Post.findAll({
    include: [ User ],
    order: [
      ['created_at', 'ASC']
    ]
  })
  .then((posts) => {
    res.json(posts);
  })
  .catch(next);
});

router.get('/:postId', (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.postId
    },
    include: {
      model: Comment
    },
    order: ['thread_id']
  })
  .then(post => {
    res.json(post);
  })
});

router.post('/', (req, res, next) => {
  Post.create(req.body)
  .then(post => {
    res.status(201).send(post);
  })
  .catch(next);
});
