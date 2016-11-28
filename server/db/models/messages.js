'use strict';

const db = require('../_db.js');
const Sequelize = require('sequelize');

const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Message;
