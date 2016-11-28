'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../../db/models');
const Comment = models.Comment;
module.exports = router;

router.post('/', (req, res, next) => {
  Comment.create(req.body)
  .then(post => {
    res.status(201).send(post);
  })
  .catch(next);
});

router.get('/:commentId', (req, res, next) => {
  Comment.findById(req.params.commentId)
  .then(comment => {
    res.json(comment);
  })
  .catch(next);
});


router.get('/getNextThreadId/:parentId/:threadId/:postId', (req, res, next) => {
  let parentId = (req.params.parentId > 0) ? req.params.parentId : null;

  Comment.findAll({
    where: {
      parent_id: parentId,
      post_id: req.params.postId
    },
    order: ['thread_id']
  })
  .then(comments => {
    let newThreadId;

    if(comments.length > 0) {
      let lastComment = comments.pop();
      let splitThreadId = lastComment.thread_id.split('.');
      let lastNum = parseInt(splitThreadId.pop()) + 1;
      splitThreadId.push(lastNum.toString());
      newThreadId = splitThreadId.join('.');
    } else {
      newThreadId = req.params.threadId + '.1'
    }

    res.json(newThreadId);
  })
  .catch(next);
});
