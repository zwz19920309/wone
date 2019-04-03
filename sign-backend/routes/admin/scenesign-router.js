const apiRouter = require('koa-router')()
const scenesignCtrl = require('../../controllers/admin/scenesign-ctrl')

// 获取签到类型列表
apiRouter.get('/getScenesignList', scenesignCtrl.getScenesignList)
// 根据id获取签到类型
apiRouter.get('/getScenesignById', scenesignCtrl.getScenesignById)
// 添加签到类型
apiRouter.get('/addScenesign', scenesignCtrl.addScenesign)
// 删除签到类型
apiRouter.get('/deleteScenesign', scenesignCtrl.deleteScenesign)

module.exports = router => {
  router.use('/admin/scenesign', apiRouter.routes(), apiRouter.allowedMethods())
}
