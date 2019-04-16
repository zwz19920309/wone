const apiRouter = require('koa-router')()
const scenesignCtrl = require('../../controllers/admin/scenesign-ctrl')

// 批量添加场景签到活动
apiRouter.post('/bulkAddScenesign', scenesignCtrl.bulkAddScenesign)
// 批量删除场景签到活动
apiRouter.post('/bulkDeleteScenesign', scenesignCtrl.bulkDeleteScenesign)

module.exports = router => {
  router.use('/admin/scenesign', apiRouter.routes(), apiRouter.allowedMethods())
}
