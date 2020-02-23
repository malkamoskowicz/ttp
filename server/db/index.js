const db = require('./db')
const User = require('./user')
const Transaction = require('./transaction')

User.hasMany(Transaction)

module.exports = {
  db,
  User,
  Transaction,
}