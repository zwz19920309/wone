
const HttpResult = require('../../common/http/http-result')
const api = require('../../common/api/api')
// 校验权限 哪里需要加上校验就加上此中间件
const checkAuth = async (ctx, next) => {
  // if (!ctx.cookies.get('admin-token')) {
  //   return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, 'cookie参数缺失'))
  // }
  // let token = ctx.cookies.get('admin-token')
  // let user = await api.getUserInfoByToken('2132131')
  // console.log('user: ', user)
  return next()
}

module.exports = {
  checkAuth
}
