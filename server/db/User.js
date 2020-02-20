const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');

const db = require('./db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cashBalance: {
    type: Sequelize.STRING,
    defaultvalue: '500000'
  }
});

module.exports = User