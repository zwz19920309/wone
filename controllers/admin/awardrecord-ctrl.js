const HttpResult = require('../../common/http/http-result')
const awardrecordService = require('../../services/admin/awardrecord-service')
// 获取奖励记录
const getAwardRecordList = async (ctx) => {
  let { page, pageSize } = ctx.request.body
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  let { total, rows } = await awardrecordService.getAwardRecordList(pageInfo)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: rows, total: total }, 'SUCCESS')
}

module.exports = {
  getAwardRecordList
}
