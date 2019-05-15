const apiRouter = require('koa-router')()
const continuesignCtrl = require('../../controllers/admin/continuesign-ctrl')
const authUtil = require('../../common/utils/auth-util')
// 获取签到类型列表
apiRouter.post('/getContinueSignRcord', continuesignCtrl.getContinueSignRcord)

module.exports = router => {
  router.use('/admin/continuesign', authUtil.checkAuth, apiRouter.routes(), apiRouter.allowedMethods())
}
