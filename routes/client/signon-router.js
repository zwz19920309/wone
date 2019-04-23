const apiRouter = require('koa-router')()
const signonCtrl = require('../../controllers/client/signon-ctrl')
// 根据id获取模板
apiRouter.get('/userSignon', signonCtrl.userSignon)

module.exports = router => {
  router.use('/signon', apiRouter.routes(), apiRouter.allowedMethods())
}
