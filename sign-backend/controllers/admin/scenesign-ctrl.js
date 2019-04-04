const Sequelize = require('sequelize')
const HttpResult = require('../../common/http/http-result')
const scenesignService = require('../../services/admin/scenesign-service')
const Op = Sequelize.Op

// 获取场景签到表
const getScenesignList = async (ctx) => {
  let { sceneId, signonId } = ctx.request.body
  let params = {}
  sceneId && (params.scene_id = sceneId)
  signonId && (params.signon_id = signonId)
  let scenesignList = await scenesignService.getScenesignList({ scene_id: sceneId, signon_id: signonId }, [])
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: scenesignList }, 'SUCCESS')
}

// 通过id获取场景签到
const getScenesignById = async (ctx) => {
  let scenesign = await scenesignService.getScenesignById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 增加场景签到
const addScenesign = async (ctx) => {
  let { sceneId, signonId } = ctx.request.body
  let scenesign = await scenesignService.addScenesign({ scene_id: sceneId, signon_id: signonId })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 批量增加场景签到
const bulkAddScenesign = async (ctx) => {
  let { scenesignons } = ctx.request.body
  let scenesign = await scenesignService.bulkCreateScenesign(scenesignons)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 删除场景签到
const deleteScenesign = async (ctx) => {
  let { id } = ctx.request.body
  let result = await scenesignService.deleteScenesign({ id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

// 批量删除场景签到
const bulkDeleteScenesign = async (ctx) => {
  let { scenesignons } = ctx.request.body
  let signonIds = []
  let sceneId
  scenesignons.forEach(ele => {
    signonIds.push(ele.signon_id)
    sceneId = ele.scene_id
  })
  let result = await scenesignService.deleteScenesign({ signon_id: { [Op.in]: signonIds }, scene_id: sceneId })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getScenesignList,
  getScenesignById,
  addScenesign,
  bulkAddScenesign,
  deleteScenesign,
  bulkDeleteScenesign
}
