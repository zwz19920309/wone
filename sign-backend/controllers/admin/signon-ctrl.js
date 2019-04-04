const Sequelize = require('sequelize')
const HttpResult = require('../../common/http/http-result')
const signonService = require('../../services/admin/signon-service')
const datetypeService = require('../../services/admin/datetype-service')
const scenesignService = require('../../services/admin/scenesign-service')
const Op = Sequelize.Op

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
  let { name, checkinType, dateType, number, startAt, endAt } = ctx.request.body
  console.log('@startAt: ', startAt)
  let dateTypeObj = await datetypeService.getOneDateTypeByCons({ type: dateType })
  let signonData = { name: name, checkintype_id: checkinType, cycle_text: JSON.stringify({ type: dateType, name: dateTypeObj.name, number: number || 0 }), start_at: startAt, end_at: endAt }
  let signon = await signonService.addSignon(signonData)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, signon, 'SUCCESS')
}

// 删除签到类型
const deleteSignon = async (ctx) => {
  let result = await signonService.deleteSignon({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

// 根据场景id获取签到类型类表
const getSignonListBySceneId = async (ctx) => {
  let { sceneId, type } = ctx.request.body
  let signonIds = await scenesignService.getScenesignList({ scene_id: sceneId }, ['signon_id'])
  let ids = []
  signonIds.forEach(ele => {
    ids.push(ele.signon_id)
  })
  let params = {}
  type && (parseInt(type) === 1) && (params.id = { [Op.notIn]: ids })
  type && (parseInt(type) === 2) && (params.id = { [Op.in]: ids })
  let signonList = await signonService.getSignonList(params)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signonList }, 'SUCCESS')
}

module.exports = {
  getSignonList,
  getSignonById,
  addSignon,
  deleteSignon,
  getSignonListBySceneId
}
