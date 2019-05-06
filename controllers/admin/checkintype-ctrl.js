const HttpResult = require('../../common/http/http-result')
const checkintypeService = require('../../services/admin/checkintype-service')

// 获取签到类型类表
const getCheckInTypeList = async (ctx) => {
  let checkInTypeList = await checkintypeService.getCheckInTypeList({}, [])
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: checkInTypeList }, 'SUCCESS')
}
module.exports = {
  getCheckInTypeList
}
