const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost:5432/ttp', {
  force: true
})

db.sync({force: true})

module.exports =  db