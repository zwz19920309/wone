const apiRouter = require('koa-router')()
const datetypeCtrl = require('../../controllers/admin/datetype-ctrl')

// 获取签到类型列表
apiRouter.post('/getDateTypeList', datetypeCtrl.getDateTypeList)

module.exports = router => {
  router.use('/admin/datetype', apiRouter.routes(), apiRouter.allowedMethods())
}
