const apiRouter = require('koa-router')()
const resignFromCtrl = require('../../controllers/admin/resignform-ctrl')

// 获取签到类型列表
apiRouter.post('/getResignFromList', resignFromCtrl.getResignFromList)

module.exports = router => {
  router.use('/admin/resignform', apiRouter.routes(), apiRouter.allowedMethods())
}
