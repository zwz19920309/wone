const apiRouter = require('koa-router')()
const signonCtrl = require('../../controllers/admin/signon-ctrl')
// 签到模板列表
apiRouter.post('/getSignonList', signonCtrl.getSignonList)
// 增加签到模板
apiRouter.post('/addSignon', signonCtrl.addSignon)
// 删除模板
apiRouter.get('/deleteSignon', signonCtrl.deleteSignon)
// 根据id获取模板
apiRouter.get('/getSignonById', signonCtrl.getSignonById)

module.exports = router => {
  router.use('/admin/signon', apiRouter.routes(), apiRouter.allowedMethods())
}
