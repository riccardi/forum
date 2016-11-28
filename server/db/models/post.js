'use strict';

const db = require('../_db.js');
const Sequelize = require('sequelize');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Post;
