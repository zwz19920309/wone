const apiRouter = require('koa-router')()
const checkintypeCtrl = require('../../controllers/admin/checkintype-ctrl')

// 获取签到类型列表
apiRouter.post('/getCheckInTypeList', checkintypeCtrl.getCheckInTypeList)

module.exports = router => {
  router.use('/admin/checkintype', apiRouter.routes(), apiRouter.allowedMethods())
}
