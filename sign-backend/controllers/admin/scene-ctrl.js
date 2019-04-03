const HttpResult = require('../../common/http/http-result')
const sceneService = require('../../services/admin/scene-service')

// 获取场景类表
const getSceneList = async (ctx) => {
  let sceneList = await sceneService.getSceneList({}, [])
  console.log('@getsceneList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: sceneList }, 'SUCCESS')
}

// 通过id获取场景
const getSceneById = async (ctx) => {
  let scene = await sceneService.getSceneById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scene, 'SUCCESS')
}

// 增加场景
const addScene = async (ctx) => {
  let { desc, name } = ctx.request.body
  let scene = await sceneService.addScene({ name: name, desc: desc })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scene, 'SUCCESS')
}

// 删除场景
const deleteScene = async (ctx) => {
  let result = await sceneService.deleteScene({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getSceneList,
  getSceneById,
  addScene,
  deleteScene
}
