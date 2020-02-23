const Sequelize = require("sequelize");

const db = require('../db')

const Transaction = db.define("transaction", {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  }
})
module.exports = Transaction