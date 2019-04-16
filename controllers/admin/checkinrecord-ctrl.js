const HttpResult = require('../../common/http/http-result')
const checkinrecordService = require('../../services/admin/checkinrecord-service')

// 获取签到类型类表
const getCheckinrecordList = async (ctx) => {
  let checkinrecordList = await checkinrecordService.getCheckinrecordList({}, [])
  console.log('@getcheckinrecordList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: checkinrecordList }, 'SUCCESS')
}

// 通过id获取签到类型
const getCheckinrecordById = async (ctx) => {
  let checkinrecord = await checkinrecordService.getCheckinrecordById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, checkinrecord, 'SUCCESS')
}

// 增加签到类型
const addCheckinrecord = async (ctx) => {
  let checkinrecord = await checkinrecordService.addCheckinrecord({ name: '每日签到' })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, checkinrecord, 'SUCCESS')
}

// 删除签到类型
const deleteCheckinrecord = async (ctx) => {
  let result = await checkinrecordService.deleteCheckinrecord({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getCheckinrecordList,
  getCheckinrecordById,
  addCheckinrecord,
  deleteCheckinrecord
}
