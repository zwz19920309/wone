const apiRouter = require('koa-router')()
const datetypeCtrl = require('../../controllers/admin/datetype-ctrl')
const authUtil = require('../../common/utils/auth-util')
// 获取签到类型列表
apiRouter.post('/getDateTypeList', datetypeCtrl.getDateTypeList)

module.exports = router => {
  router.use('/admin/datetype', authUtil.checkAuth, apiRouter.routes(), apiRouter.allowedMethods())
}
