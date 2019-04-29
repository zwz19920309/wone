const HttpResult = require('../../common/http/http-result')
const continuesignService = require('../../services/admin/continuesign-service')

// 获取日期类型类表
const getContinueSignRcord = async (ctx) => {
  let { scenesignId } = ctx.request.body
  let continusignRecordList = await continuesignService.getContinueSignRcord({ scenesign_id: scenesignId })
  console.log('@getContinueSignRcord:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: continusignRecordList }, 'SUCCESS')
}

module.exports = {
  getContinueSignRcord
}
