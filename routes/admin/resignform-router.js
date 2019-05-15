const apiRouter = require('koa-router')()
const resignFromCtrl = require('../../controllers/admin/resignform-ctrl')
const authUtil = require('../../common/utils/auth-util')
// 获取签到类型列表
apiRouter.post('/getResignFormList', resignFromCtrl.getResignFormList)

module.exports = router => {
  router.use('/admin/resignform', authUtil.checkAuth, apiRouter.routes(), apiRouter.allowedMethods())
}
