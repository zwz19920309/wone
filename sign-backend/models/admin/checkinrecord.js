const BnSequelize = require('../../mysql/bn-app-mysql')
const Sequelize = require('sequelize')
const moment = require('moment')
// 签到记录
let checkInType = BnSequelize.define('checkin_record', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: Sequelize.BIGINT,
    comment: '用户uuid'
  },
  record_date: {
    type: Sequelize.DATE,
    comment: '签到日期'
  },
  scenesign_id: {
    type: Sequelize.BIGINT
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
  tableName: 'checkin_record'
})

module.exports = checkInType
