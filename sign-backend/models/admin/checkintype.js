const BnSequelize = require('../../mysql/bn-app-mysql')
const Sequelize = require('sequelize')
const moment = require('moment')
// 签到类型
let checkInType = BnSequelize.define('checkin_type', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: Sequelize.TINYINT,
    comment: '签到类型'
  },
  name: {
    type: Sequelize.STRING(40),
    comment: '签到类型名称'
  },
  createdAt: {
    type: Sequelize.DATE,
    get () {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    get () {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  tableName: 'checkin_type'
})

module.exports = checkInType
