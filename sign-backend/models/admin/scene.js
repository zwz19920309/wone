const BnSequelize = require('../../mysql/bn-app-mysql')
const Sequelize = require('sequelize')
const moment = require('moment')
// 场景
let scene = BnSequelize.define('scene', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(40),
    comment: '日期类型名称'
  },
  createdAt: {
    type: Sequelize.DATE,
    get () {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    get () {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, {
  tableName: 'scene'
})

module.exports = scene
