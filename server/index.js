const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging middleware
const morgan = require('morgan')
app.use(morgan('dev'))

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));

//passport middleware
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

//use bundle.js
app.use(express.static(path.join(__dirname, '..')))

//use api and auth routes
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))
app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(process.env.PORT || 3037)

module.exports = app