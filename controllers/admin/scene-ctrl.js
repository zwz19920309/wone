const HttpResult = require('../../common/http/http-result')
const sceneService = require('../../services/admin/scene-service')

// 获取场景类表
const getSceneList = async (ctx) => {
  let { page, pageSize } = ctx.request.body
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  let sceneList = await sceneService.getSceneList(pageInfo)
  console.log('@getsceneList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: sceneList.rows, total: Math.ceil(sceneList.total / pageInfo.pageSize) }, 'SUCCESS')
}

// 增加场景
const addScene = async (ctx) => {
  let { desc, name } = ctx.request.body
  let scene = await sceneService.addScene({ name: name, note: desc })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scene, 'SUCCESS')
}

module.exports = {
  getSceneList,
  addScene
}
