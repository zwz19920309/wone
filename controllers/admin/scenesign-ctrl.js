const HttpResult = require('../../common/http/http-result')
const scenesignService = require('../../services/admin/scenesign-service')

// 批量增加场景签到
const bulkAddScenesign = async (ctx) => {
  let { scenesignons } = ctx.request.body
  let paramsArr = []
  scenesignons.forEach(ele => {
    paramsArr.push([ ele.sceneId, ele.signonId, ele.startAt, ele.endAt ])
  })
  let scenesign = await scenesignService.bulkCreateScenesign(paramsArr)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 批量删除场景签到
const bulkDeleteScenesign = async (ctx) => {
  let { scenesignons } = ctx.request.body
  let signonIds = []
  let sceneId
  scenesignons.forEach(ele => {
    signonIds.push(ele.signonId)
    sceneId = ele.sceneId
  })
  let result = await scenesignService.bulkDeleteScenesign({ signonIds: signonIds, sceneId: sceneId })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  bulkAddScenesign,
  bulkDeleteScenesign
}
