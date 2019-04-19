const HttpResult = require('../../common/http/http-result')
const resignFormService = require('../../services/admin/resignform-service')

// 获取日期类型类表
const getResignFromList = async (ctx) => {
  let resignFormList = await resignFormService.getResignFromList()
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: resignFormList }, 'SUCCESS')
}

module.exports = {
  getResignFromList
}
