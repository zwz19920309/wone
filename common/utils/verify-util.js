const HttpResult = require('../../common/http/http-result')
const sceneService = require('../../services/admin/scene-service')
// 校验权限 哪里需要加上校验就加上此中间件
const verify = async (ctx, next) => {
  let { uid, sceneid, appid, appsecret } = ctx.request.body
  if (!uid || !sceneid || !appid || !appsecret) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let scene = await sceneService.findOneScene({ id: sceneid })
  if (!scene) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '场景不存在'))
  }
  if (appid === scene.app_id && appsecret === scene.app_secret) {
    return next()
  }
  ctx.response.body = HttpResult.response(HttpResult.HttpStatus.TOKEN_OUTTIME, null, 'appid,appsecret不合法')
}

module.exports = {
  verify
}
