const Sequelize = require('sequelize')
const config = require('../config/db-config')
let sequelize = new Sequelize('app', config.MYSQL_BN.USER, config.MYSQL_BN.PWD, {
  host: config.MYSQL_BN.IP,
  port: config.MYSQL_BN.PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
    requestTimeout: 999999
  },
  logging: true
})

module.exports = sequelize
