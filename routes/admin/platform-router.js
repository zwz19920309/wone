const apiRouter = require('koa-router')()
const platformCtrl = require('../../controllers/admin/platform-ctrl')

// 获取平台列表
apiRouter.post('/getPlatFormList', platformCtrl.getPlatFormList)
// 添加平台类型
apiRouter.post('/addPlatForm', platformCtrl.addPlatForm)

module.exports = router => {
  router.use('/admin/platform', apiRouter.routes(), apiRouter.allowedMethods())
}
