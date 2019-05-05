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
// 获取奖品
apiRouter.post('/getPrizesBySignonById', signonCtrl.getPrizesBySignonById)
// 消费奖品
apiRouter.post('/getConsumesBySignonById', signonCtrl.getConsumesBySignonById)
// 添加消费奖品
apiRouter.post('/bulkAddConsumes', signonCtrl.bulkAddConsumes)
// 删除消费奖品
apiRouter.post('/bulkDeleteConsumes', signonCtrl.bulkDeleteConsumes)
// 用户签到
apiRouter.post('/userSignon', signonCtrl.userSignon)
//  getSelfSignon
apiRouter.post('/getSelfSignon', signonCtrl.getSelfSignon)
// 用户重新签到
apiRouter.post('/reSignon', signonCtrl.reSignon)
module.exports = router => {
  router.use('/admin/signon', apiRouter.routes(), apiRouter.allowedMethods())
}
