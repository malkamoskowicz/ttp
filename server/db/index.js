const db = require('./db')
const User = require('./User')
const Transaction = require('./Transaction')

User.hasMany(Transaction)

module.exports = {
  db,
  User,
  Transaction,
}