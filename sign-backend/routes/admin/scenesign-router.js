const apiRouter = require('koa-router')()
const scenesignCtrl = require('../../controllers/admin/scenesign-ctrl')

// 获取场景签到活动列表
apiRouter.post('/getScenesignList', scenesignCtrl.getScenesignList)
// 根据id获取场景签到活动
apiRouter.get('/getScenesignById', scenesignCtrl.getScenesignById)
// 添加场景签到活动
apiRouter.post('/addScenesign', scenesignCtrl.addScenesign)
// 批量添加场景签到活动
apiRouter.post('/bulkAddScenesign', scenesignCtrl.bulkAddScenesign)
// 批量删除场景签到活动
apiRouter.post('/bulkDeleteScenesign', scenesignCtrl.bulkDeleteScenesign)
// 删除场景签到活动
apiRouter.get('/deleteScenesign', scenesignCtrl.deleteScenesign)

module.exports = router => {
  router.use('/admin/scenesign', apiRouter.routes(), apiRouter.allowedMethods())
}
