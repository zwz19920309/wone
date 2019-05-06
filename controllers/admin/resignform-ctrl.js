const HttpResult = require('../../common/http/http-result')
const resignFormService = require('../../services/admin/resignform-service')

// 获取补签方式列表
const getResignFormList = async (ctx) => {
  let resignFormList = await resignFormService.getResignFormList()
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: resignFormList }, 'SUCCESS')
}

module.exports = {
  getResignFormList
}
