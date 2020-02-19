const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));

//use bundle.js
app.use(express.static(path.join(__dirname, '..')))

//use api and auth routes
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(process.env.PORT || 3039)

module.exports = app