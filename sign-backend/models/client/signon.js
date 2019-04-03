const BnSequelize = require('../../mysql/bn-app-mysql')
const Sequelize = require('sequelize')
// 签到模板
let signon = BnSequelize.define('signon', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  cycle_text: {
    type: Sequelize.JSON,
    comment: '签到日期类型以及详细信息'
  },
  extra_text: {
    type: Sequelize.JSON,
    comment: '额外信息'
  },
  rule_desc: {
    type: Sequelize.STRING(400),
    comment: '签到模板规则'
  },
  start_at: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '开始时间'
  },
  end_at: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '结束时间'
  },
  createdAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, {
  tableName: 'signon',
  timestamps: false
})

module.exports = signon
