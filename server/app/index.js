const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: 'supersecret'
// }));

// Initialize Passport and restore authentication state, if any, from the
// session.
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.use(express.static('public'));
// app.use(express.static('node_modules'));
//
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function (id, done) {
//   User.findById(id)
//       .then(user => {
//         done(null, user);
//       })
//       .catch(done);
// });

app.use('/api', require('./routes/api'));

app.use('/auth', require('./routes/auth'));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../../browser') });
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
