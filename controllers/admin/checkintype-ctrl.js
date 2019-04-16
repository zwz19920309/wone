const HttpResult = require('../../common/http/http-result')
const checkintypeService = require('../../services/admin/checkintype-service')

// 获取签到类型类表
const getCheckInTypeList = async (ctx) => {
  let checkInTypeList = await checkintypeService.getCheckInTypeList({}, [])
  console.log('@getCheckInTypeList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: checkInTypeList }, 'SUCCESS')
}

// 通过id获取签到类型
const getCheckInTypeById = async (ctx) => {
  let checkInType = await checkintypeService.getCheckInTypeById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, checkInType, 'SUCCESS')
}

// 增加签到类型
const addCheckInType = async (ctx) => {
  let checkInType = await checkintypeService.addCheckInType({ name: '每日签到' })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, checkInType, 'SUCCESS')
}

// 删除签到类型
const deleteCheckInType = async (ctx) => {
  let result = await checkintypeService.deleteCheckInType({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getCheckInTypeList,
  getCheckInTypeById,
  addCheckInType,
  deleteCheckInType
}
