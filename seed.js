const chalk = require('chalk');
const db = require('./server/db/index.js');
const User = db.model('user');
const Post = db.model('post');
const Comment = db.model('comment');
const Promise = require('sequelize').Promise;

let seedUsers = function () {

  let users = [
    {
      email: 'ashley@gmail.com',
      password: 'asdf'
    },
    {
      email: 'obama@gmail.com',
      password: 'potus'
    }
  ];

  let creatingUsers = users.map(function (userObj) {
    return User.create(userObj);
  });

  return Promise.all(creatingUsers);

};

let seedPosts = function() {
  let posts = [
    {
      title: 'Post 1',
      content: 'Lorem Ipsum Dolorem',
      user_id: 1
    },
    {
      title: 'Post 2',
      content: 'Soles sunt occidere et redire',
      user_id: 1
    }
  ];

  let creatingPosts = posts.map(function (postObj) {
    return Post.create(postObj);
  });

  return Promise.all(creatingPosts);
}

let seedComments = () => {
  let comments = [
    {
      title: 'In Reply to Post 1',
      content: 'Here is what I think about lorem ipsum',
      thread_id: '1.1'
    },
    {
      title: 'In Reply to In Reply to Post 1',
      content: 'I can see what you are saying but I slightly disagree',
      thread_id: '1.1.1'
    },
    {
      title: '3rd Reply',
      content: 'I am the third reply in this thread',
      thread_id: '1.1.1.1'
    },
    {
      title: '1st Reply to 2nd Post',
      content: 'I am the 1st reply in this thread',
      thread_id: '2.1'
    },
    {
      title: 'Reply to 3rd Reply',
      content: 'I am the 1st reply to the third reply in this thread',
      thread_id: '1.1.1.2'
    }
  ];

  let creatingComments = comments.map(function (commentObj) {
    return Comment.create(commentObj);
  });

  return Promise.all(creatingComments);
};

db.sync({ force: true })
.then(() => {
  return seedUsers();
})
.then(() => {
  return seedPosts();
})
.then(() => {
  return seedComments();
})
.then(() => {
  console.log('in User')
  return User.findById(1)
  .then((user) => {
    return user.addPost([1])
  });
})
.then(() => {
  console.log('in Post');
  return Post.findById(1)
  .then((post) => {
    return post.addComment([1, 2, 3, 5])
  })
})
.then(() => {
  console.log('in Post 2');
  return Post.findById(2)
  .then((post) => {
    return post.addComment([4])
  })
})
.then(() => {
  console.log('in Comment')
  return Comment.findById(1)
  .then((comment) => {
    console.log('Looking for comment id 2:', comment.id);
    return comment.addParent([2]);
  });
})
.then(() => {
  console.log('in Comment 2')
  return Comment.findById(2)
  .then((comment2) => {
    console.log('Looking for comment id 3:', comment2.id);
    return comment2.addParent([3]);
  });
})
.then(() => {
  console.log('in Post.findAll');
  return Post.findAll({ include: [ Comment ]})
    .then((posts) => {
      posts.forEach((post) => {
        console.log('post', post);
        console.log('post comments', post.comments);
      });
    })
  console.log('in here');
})
.then(() => {
  console.log(chalk.green('Seed successful!'));
  process.kill(0);
})
.catch((err) => {
  console.error(err);
  process.kill(1);
});
