const moment = require('moment')
const HttpResult = require('../../common/http/http-result')
const ToolUtil = require('../../common/utils/tool-util')
const signonService = require('../../services/admin/signon-service')
const sceneService = require('../../services/admin/scene-service')
const datetypeService = require('../../services/admin/datetype-service')
const prizeService = require('../../services/admin/prize-service')
const awardrecordService = require('../../services/admin/awardrecord-service')
const signrecordService = require('../../services/admin/signrecord-service')

// 获取签到类型类表
const getSignonList = async (ctx) => {
  let { page, pageSize } = ctx.request.body
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  let signonList = await signonService.getSignonList(pageInfo)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signonList.rows, total: signonList.total }, 'SUCCESS')
}

// 通过id获取签到类型
const getSignonById = async (ctx) => {
  let { id } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, signon, 'SUCCESS')
}

// 增加签到类型
const addSignon = async (ctx) => {
  let { name, checkinType, dateType, number, startAt, endAt, desc, formId, isResign, resignDates, cost } = ctx.request.body
  console.log('@startAt: ', startAt)
  let dateTypeObj = await datetypeService.getOneDateTypeByCons({ type: dateType })
  let extraText = parseInt(isResign) === 2 ? { resign: { isResign: isResign, formId: formId, cost: cost, resignDates: resignDates || [] } } : {}
  let signonData = { name: name, checkintype_id: checkinType, rule_desc: desc, cycle_text: JSON.stringify({ type: dateType, name: dateTypeObj[0].name, number: number || 0 }), extra_text: JSON.stringify(extraText), start_at: startAt, end_at: endAt }
  let signon = await signonService.addSignon(signonData)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, signon, 'SUCCESS')
}

// 更新签到类型
const updateSignonById = async (ctx) => {
  let { id, name, checkinTypeId, dateTypeId, number, ruleDesc } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let params = { name: name || signon.name, checkintype_id: checkinTypeId || signon.checkintype_id, rule_desc: ruleDesc || signon.rule_desc }
  if (dateTypeId) {
    let dateType = await datetypeService.getDateTypeById({ id: dateTypeId })
    params.cycle_text = JSON.stringify({ name: dateType.name, number: number || '0', type: parseInt(dateType.id) })
  }
  let result = await signonService.upDateSignonInfo(params, { id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

// 删除签到类型
const deleteSignon = async (ctx) => {
  let { id } = ctx.request.body
  let result = await signonService.deleteSignon({ ids: [id] })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

// 批删除签到模板
const bulkDeleteSignOn = async (ctx) => {
  let { ids } = ctx.request.body
  let scenesign = await signonService.deleteSignon({ ids: ids })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 根据场景id获取签到类型类表
const getSignonListBySceneId = async (ctx) => {
  let { sceneId, type, page, pageSize } = ctx.request.body
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  let params = { sceneId: sceneId }
  let scene = await sceneService.findOneScene({ id: sceneId })
  let signonList = (parseInt(type) === 1) ? await signonService.getSignonNotInList(params) : await signonService.getSignonInList(params)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signonList.rows, scene: scene, total: signonList.total }, 'SUCCESS')
}

// 签到模板批量添加奖品列表
const bulkAddPrizes = async (ctx) => {
  let { id, number, prizeIds } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let prizesText = signon.prizes_text || {}
  if (!prizesText.prizes) {
    prizesText.prizes = [{ [number]: prizeIds }]
  } else if (!prizesText.prizes[0][number]) {
    prizesText.prizes[0][number] = prizeIds
  } else {
    prizesText.prizes[0][number] = prizesText.prizes[0][number].concat(prizeIds)
  }
  let res = await signonService.upDateSignon({ prizes_text: JSON.stringify(prizesText) }, { id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, res, 'SUCCESS')
}

// 签到模板批量删除奖品列表
const bulkDeletePrizes = async (ctx) => {
  let { id, number, prizeIds } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let prizesText = signon.prizes_text
  if (!(prizesText.prizes && prizesText.prizes[0] && prizesText.prizes[0][number])) {
    ctx.body = HttpResult.response(HttpResult.HttpStatus.FAIL, {}, 'FAIL')
  }
  prizesText.prizes[0][number] = ToolUtil.removeDuplication(prizesText.prizes[0][number], prizeIds)
  let res = await signonService.upDateSignon({ prizes_text: JSON.stringify(prizesText) }, { id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, res, 'SUCCESS')
}

// 通过id,number, type获取模板的可选择礼品列表
const getPrizesBySignonById = async (ctx) => {
  let { id, number, type, page, pageSize } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let prizesText = signon.prizes_text || {}
  let prizes = { rows: [], count: 0 }
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  if (prizesText.prizes && prizesText.prizes[0] && prizesText.prizes[0][number] && prizesText.prizes[0] && prizesText.prizes[0][number].length) {
    let existIds = await prizesText.prizes[0][number]
    let pType = parseInt(type)
    if (pType === 1) {
      prizes = await prizeService.getPrizeList(existIds, pType)
    } else {
      prizes = await prizeService.getPrizeList(existIds, pType)
    }
  } else {
    if (parseInt(type) === 1) {
      prizes = await prizeService.getPrizeList(pageInfo)
    }
  }
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: prizes.rows, total: Math.ceil(prizes.count / pageInfo.pageSize) }, 'SUCCESS')
}

// 通过id,number, type获取模板的可选择礼品列表
const getConsumesBySignonById = async (ctx) => {
  let { id, date, type, page, pageSize } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let extraText = signon.extra_text || {}
  let consumes = { rows: [], count: 0 }
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  if (extraText.consumes && extraText.consumes[0] && extraText.consumes[0][date] && extraText.consumes[0][date].length) {
    let existIds = await extraText.consumes[0][date]
    let pType = parseInt(type)
    consumes = await prizeService.getPrizeList(existIds, pType)
  } else {
    if (parseInt(type) === 1) {
      consumes = await prizeService.getPrizeList(pageInfo)
    }
  }
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: consumes.rows, total: consumes.total }, 'SUCCESS')
}

// 签到模板批量添加消耗奖品列表
const bulkAddConsumes = async (ctx) => {
  let { id, date, prizeIds } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let extraText = signon.extra_text || {}
  if (!extraText.consumes) {
    extraText.consumes = [{ [date]: prizeIds }]
  } else if (!extraText.consumes[0][date]) {
    extraText.consumes[0][date] = prizeIds
  } else {
    extraText.consumes[0][date] = extraText.consumes[0][date].concat(prizeIds)
  }
  let res = await signonService.upDateSignonConsums({ extraText: JSON.stringify(extraText) }, { id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, res, 'SUCCESS')
}

// 签到模板批量删除消耗奖品列表
const bulkDeleteConsumes = async (ctx) => {
  let { id, date, prizeIds } = ctx.request.body
  let signon = await signonService.getSignonById({ id: id })
  let extraText = signon.extra_text
  if (!(extraText.consumes && extraText.consumes[0] && extraText.consumes[0][date])) {
    ctx.body = HttpResult.response(HttpResult.HttpStatus.FAIL, {}, 'FAIL')
  }
  extraText.consumes[0][date] = ToolUtil.removeDuplication(extraText.consumes[0][date], prizeIds)
  let res = await signonService.upDateSignonConsums({ extraText: JSON.stringify(extraText) }, { id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, res, 'SUCCESS')
}

// 用户当日签到
const getSignons = async (ctx) => {
  let { uid, sceneId } = ctx.request.body
  let nowDate = moment().format('YYYY-MM-DD')
  let signRecord = await signrecordService.getUserSignRcord({ uid: uid, scene_id: sceneId, created_at: nowDate })
  if (signRecord) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '今日已签到'))
  }
  let prizeIds = await signrecordService.getTodaySignonPrizes({ uid: uid, scene_id: sceneId })
  // if (!prizeIds.length) {
  //   return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_DB, null, '操作异常'))
  // }
  let params = { prizes: [], record: { uid: uid, scene_id: sceneId, created_at: nowDate } }
  prizeIds.forEach(prizeId => {
    params.prizes.push([uid, prizeId, sceneId, nowDate])
  })
  let res = await signrecordService.userSignonAward(params)
  if (!res) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_DB, null, '操作异常'))
  }
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: prizeIds }, 'SUCCESS')
}

// 用户当日签到
const userSignon = async (ctx) => {
  let { uid, sceneId } = ctx.request.body
  let nowDate = moment().format('YYYY-MM-DD')
  let signRecord = await signrecordService.getUserSignRcord({ uid: uid, scene_id: sceneId, created_at: nowDate })
  if (signRecord) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '今日已签到'))
  }
  let prizeIds = await signrecordService.getTodaySignonPrizes({ uid: uid, scene_id: sceneId })
  // if (!prizeIds.length) {
  //   return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_DB, null, '操作异常'))
  // }
  let params = { prizes: [], record: { uid: uid, scene_id: sceneId, created_at: nowDate } }
  prizeIds.forEach(prizeId => {
    params.prizes.push([uid, prizeId, sceneId, nowDate])
  })
  let res = await signrecordService.userSignonAward(params)
  if (!res) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_DB, null, '操作异常'))
  }
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: prizeIds }, 'SUCCESS')
}

// 用户当日签到
const getSelfSignon = async (ctx) => {
  let { uid, sceneId } = ctx.request.body
  let signons = await signrecordService.getSelfSignon({ uid: 1, scene_id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signons }, 'SUCCESS')
}
module.exports = {
  updateSignonById,
  getSignonList,
  getSignonById,
  getPrizesBySignonById,
  addSignon,
  deleteSignon,
  getSignonListBySceneId,
  bulkDeleteSignOn,
  bulkAddPrizes,
  bulkDeletePrizes,
  getConsumesBySignonById,
  bulkAddConsumes,
  bulkDeleteConsumes,
  userSignon,
  getSelfSignon
}
