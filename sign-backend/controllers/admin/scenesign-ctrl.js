const HttpResult = require('../../common/http/http-result')
const scenesignService = require('../../services/admin/scenesign-service')

// 获取场景签到表
const getScenesignList = async (ctx) => {
  let scenesignList = await scenesignService.getScenesignList({}, [])
  console.log('@getscenesignList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: scenesignList }, 'SUCCESS')
}

// 通过id获取场景签到
const getScenesignById = async (ctx) => {
  let scenesign = await scenesignService.getScenesignById(1)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 增加场景签到
const addScenesign = async (ctx) => {
  let scenesign = await scenesignService.addScenesign({ desc: '描述', sceneId: 1, signonId: '1' })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 删除场景签到
const deleteScenesign = async (ctx) => {
  let result = await scenesignService.deleteScenesign({ id: 2 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getScenesignList,
  getScenesignById,
  addScenesign,
  deleteScenesign
}
