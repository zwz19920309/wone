const apiRouter = require('koa-router')()
const signonCtrl = require('../../controllers/admin/signon-ctrl')
// 签到模板列表
apiRouter.post('/getSignonList', signonCtrl.getSignonList)
// 增加签到模板
apiRouter.post('/addSignon', signonCtrl.addSignon)
// 删除模板
apiRouter.post('/deleteSignon', signonCtrl.deleteSignon)
// 批量删除模板
apiRouter.post('/bulkDeleteSignOn', signonCtrl.bulkDeleteSignOn)
// 根据id获取模板
apiRouter.post('/getSignonById', signonCtrl.getSignonById)
// 获取场景签到活动数据
apiRouter.post('/getSignonListBySceneId', signonCtrl.getSignonListBySceneId)
// 批量添加奖品
apiRouter.post('/bulkAddPrizes', signonCtrl.bulkAddPrizes)
// 批量删除奖品
apiRouter.post('/bulkDeletePrizes', signonCtrl.bulkDeletePrizes)
// 更新模板信息
apiRouter.post('/updateSignonById', signonCtrl.updateSignonById)
// 批量添加奖品
apiRouter.post('/getPrizesBySignonById', signonCtrl.getPrizesBySignonById)
module.exports = router => {
  router.use('/admin/signon', apiRouter.routes(), apiRouter.allowedMethods())
}
