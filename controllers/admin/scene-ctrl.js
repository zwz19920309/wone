const HttpResult = require('../../common/http/http-result')
const sceneService = require('../../services/admin/scene-service')

// 获取场景类表
const getSceneList = async (ctx) => {
  let { page, pageSize } = ctx.request.body
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  let sceneList = await sceneService.getSceneList(pageInfo)
  console.log('@getsceneList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: sceneList.rows, total: sceneList.total }, 'SUCCESS')
}

// 增加场景
const addScene = async (ctx) => {
  let { note, name, startAt, endAt } = ctx.request.body
  let scene = await sceneService.addScene({ name: name, note: note, start_at: startAt, end_at: endAt })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scene, 'SUCCESS')
}

// 修改场景
const updateScene = async (ctx) => {
  let { name, note, startAt, endAt, id } = ctx.request.body
  let scene = await sceneService.findOneScene({ id: id })
  let result = await sceneService.updateScene({ name: name || scene.name, note: note || scene.note, start_at: startAt || scene.start_at, end_at: endAt || scene.end_at, id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

// 删除场景
const bulkDeleteScene = async (ctx) => {
  let { ids } = ctx.request.body
  let scene = await sceneService.bulkDeleteScene({ ids: ids })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scene, 'SUCCESS')
}

// updateScene
module.exports = {
  getSceneList,
  addScene,
  bulkDeleteScene,
  updateScene
}
