const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan')
app.use(morgan('dev'))

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
// app.use(express.static(path.join(__dirname, './path/to/your/static/assets')))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3033)