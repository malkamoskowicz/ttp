const Sequelize = require('sequelize');

const db = require('./db')

const Stock = db.define('user', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
module.exports = Stock