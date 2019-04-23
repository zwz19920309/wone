const HttpResult = require('../../common/http/http-result')
const signonService = require('../../services/admin/signon-service')
const scenesignService = require('../../services/admin/scenesign-service')
// 获取签到类型类表
const userSignon = async (ctx) => {
  let { uid, sceneId } = ctx.request.body
  // let signonList = await signonService.getSignonList({}, [])
  let signonList = await signonService.getSignonInList({ id: sceneId })
  console.log('@getsignonList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signonList }, 'SUCCESS')
}

module.exports = {
  userSignon
}
