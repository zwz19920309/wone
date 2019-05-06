const HttpResult = require('../../common/http/http-result')
const continuesignService = require('../../services/admin/continuesign-service')

// 获取连续签到-场景签到任务的新周期开始时间以及上一周期结束时间
const getContinueSignRcord = async (ctx) => {
  let { scenesignId } = ctx.request.body
  if (!scenesignId) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数scenesignId缺失'))
  }
  let continusignRecordList = await continuesignService.getContinueSignRcord({ scenesign_id: scenesignId })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: continusignRecordList }, 'SUCCESS')
}

module.exports = {
  getContinueSignRcord
}
