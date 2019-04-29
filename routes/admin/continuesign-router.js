const apiRouter = require('koa-router')()
const continuesignCtrl = require('../../controllers/admin/continuesign-ctrl')

// 获取签到类型列表
apiRouter.post('/getContinueSignRcord', continuesignCtrl.getContinueSignRcord)

module.exports = router => {
  router.use('/admin/continuesign', apiRouter.routes(), apiRouter.allowedMethods())
}
