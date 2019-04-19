const apiRouter = require('koa-router')()
const resignDateCtrl = require('../../controllers/admin/resigndate-ctrl')

// 获取可补签日期列表
apiRouter.post('/getResignDateList', resignDateCtrl.getResignDateList)
apiRouter.post('/addResignDate', resignDateCtrl.addResignDate)
module.exports = router => {
  router.use('/admin/resigndate', apiRouter.routes(), apiRouter.allowedMethods())
}
