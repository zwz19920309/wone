const HttpResult = require('../../common/http/http-result')
const resignDateService = require('../../services/admin/resigndate-service')

// 获取日期类型类表
const getResignDateList = async (ctx) => {
  let resignDateList = await resignDateService.getResignDateList()
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: resignDateList }, 'SUCCESS')
}

// 获取日期类型类表
const addResignDate = async (ctx) => {
  let { resignDates } = ctx.request.body
  let resignDateList = await resignDateService.addResignDate(resignDates)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: resignDateList }, 'SUCCESS')
}

module.exports = {
  getResignDateList,
  addResignDate
}
