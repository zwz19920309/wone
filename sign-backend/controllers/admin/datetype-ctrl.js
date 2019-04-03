const HttpResult = require('../../common/http/http-result')
const datetypeService = require('../../services/admin/datetype-service')

// 获取日期类型类表
const getDateTypeList = async (ctx) => {
  let { type } = ctx.request.body
  let dateTypeList
  (!type) && (type = 0)
  dateTypeList = await datetypeService.getDateTypeListByType(type)
  console.log('@getdateTypeList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: dateTypeList }, 'SUCCESS')
}

// 通过id获取日期类型
const getDateTypeById = async (ctx) => {
  let dateType = await datetypeService.getDateTypeById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, dateType, 'SUCCESS')
}

// 增加日期类型
const addDateType = async (ctx) => {
  let dateType = await datetypeService.addDateType({ name: '自定义' })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, dateType, 'SUCCESS')
}

// 删除日期类型
const deleteDateType = async (ctx) => {
  let result = await datetypeService.deleteDateType({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getDateTypeList,
  getDateTypeById,
  addDateType,
  deleteDateType
}
