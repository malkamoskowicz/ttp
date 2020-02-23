const User = require('./user')
const Transaction = require('./transaction')

User.hasMany(Transaction)

module.exports = {
  User,
  Transaction,
};
