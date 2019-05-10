const HttpResult = require('../../common/http/http-result')
// 校验权限 哪里需要加上校验就加上此中间件
const checkAuth = async (ctx, next) => {
  // if (ctx.url === '/bonus/admin/prize/getPrizeList') {
  //   ctx.cookies.set('cid', 'hello world')
  //   console.log('@setCokie-----------')
  // }
  // // if (!ctx.cookies.get('admin-token')) {
  // //   return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  // // }
  // // let token = ctx.cookies.get('admin-token')
  // // console.log('@token: ', token)
  // return next()
  // ctx.response.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, null, 'cookie is ok')
  // ctx.response.body = HttpResult.response(HttpResult.HttpStatus.TOKEN_OUTTIME, null, 'appid,appsecret不合法')
}

module.exports = {
  checkAuth
}
