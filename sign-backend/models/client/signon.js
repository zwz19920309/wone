const BnSequelize = require('../../mysql/bn-app-mysql')
const Sequelize = require('sequelize')
const moment = require('moment')
// 签到模板
let signon = BnSequelize.define('signon', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(40),
    comment: '签到模板名称'
  },
  cycle_text: {
    type: Sequelize.JSON,
    comment: '签到日期类型以及详细信息',
    get () {
      if (!this.getDataValue('cycle_text')) {
        return {}
      }
      return JSON.parse(this.getDataValue('cycle_text'))
    }
  },
  extra_text: {
    type: Sequelize.JSON,
    comment: '额外信息',
    get () {
      if (!this.getDataValue('extra_text')) {
        return {}
      }
      return JSON.parse(this.getDataValue('extra_text'))
    }
  },
  rule: {
    type: Sequelize.JSON,
    comment: '签到模板规则',
    get () {
      if (!this.getDataValue('rule')) {
        return {}
      }
      return JSON.parse(this.getDataValue('rule'))
    }
  },
  rule_desc: {
    type: Sequelize.STRING(400),
    comment: '签到模板规则描述'
  },
  start_at: {
    type: Sequelize.DATE,
    get () {
      return moment(this.getDataValue('start_at')).format('YYYY-MM-DD')
    }
  },
  end_at: {
    type: Sequelize.DATE,
    get () {
      return moment(this.getDataValue('end_at')).format('YYYY-MM-DD')
    }
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
  tableName: 'signon'
})

module.exports = signon
