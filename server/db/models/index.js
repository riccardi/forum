'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');

User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.hasMany(Comment, { as: 'parent', foreignKey: 'parent_id'});
Comment.belongsTo(Comment, { as: 'child', foreignKey: 'parent_id'});


// exported just in case, but can also be fetched via db.model('Album') etc.
module.exports = { User, Post, Comment};
