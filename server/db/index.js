const User = require('./User')
const Transaction = require('./Transaction')
const db = require('./db')

User.hasMany(Transaction)
module.exports = {db, User, Transaction}