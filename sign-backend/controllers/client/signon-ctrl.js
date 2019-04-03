const HttpResult = require('../../common/http/http-result')
const signonService = require('../../services/admin/signon-service')

// 获取签到类型类表
const getSignonList = async (ctx) => {
  let signonList = await signonService.getSignonList({}, [])
  console.log('@getsignonList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signonList }, 'SUCCESS')
}

// 通过id获取签到类型
const getSignonById = async (ctx) => {
  let signon = await signonService.getSignonById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, signon, 'SUCCESS')
}

// 增加签到类型
const addSignon = async (ctx) => {
  let { checkinType, dateType, number, startAt, endAt } = ctx.request.body
  console.log('@startAt: ', startAt)
  let signonData = { checkintype_id: checkinType, cycle_text: JSON.stringify({ dateType: dateType, dateTypeName: '自定义', number: number || 0 }), start_at: startAt, end_at: endAt }
  let signon = await signonService.addSignon(signonData)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, signon, 'SUCCESS')
}

// 删除签到类型
const deleteSignon = async (ctx) => {
  let result = await signonService.deleteSignon({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getSignonList,
  getSignonById,
  addSignon,
  deleteSignon
}
