const HttpResult = require('../../common/http/http-result')
const awardrecordService = require('../../services/admin/awardrecord-service')
// 获取奖励记录
const getAwardRecordList = async (ctx) => {
  let { pid, page, size } = ctx.request.body
  if (!pid) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let { total, rows } = await awardrecordService.getAwardRecordList({ page: page || 1, pageSize: size || 10, platform_id: pid })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: rows, total: total }, 'SUCCESS')
}

module.exports = {
  getAwardRecordList
}
