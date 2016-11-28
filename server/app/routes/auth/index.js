const router = require('express').Router();
const models = require('../../../db/models');
const User = models.User;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

router.post('/login', function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({
    where: {
      email: email
    }
  })
  .then(function (user) {

    if (!user || !user.correctPassword(password)) {
      res.sendStatus(401);
    } else {
      // Properly authenticated.
      req.session.userId = user.id;
      console.log('req.session.userId', req.session.userId);
      res.sendStatus(204);
    }
  })
  .catch(next);
  // User.findOne({
  //   where: req.body
  // })
  // .then(function (user) {
  //   if (!user) {
  //     res.sendStatus(401);
  //   } else {
  //     req.session.userId = user.id;
  //     res.sendStatus(204);
  //   }
  // })
  // .catch(next);
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.sendStatus(204);
});

router.post('/signup', function (req, res, next) {

  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      password: req.body.password
    }
  })
  .then(function (user) {
    req.sess
    req.session.userId = user.id;
    res.sendStatus(204);
  });

});

router.get('/me', function (req, res, next) {
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
