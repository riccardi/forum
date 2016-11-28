'use strict';

const db = require('../_db.js');
const Sequelize = require('sequelize');

const Comment = db.define('comment', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  thread_id: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Comment;
