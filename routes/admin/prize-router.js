const apiRouter = require('koa-router')()
const prizeCtrl = require('../../controllers/admin/prize-ctrl')

// 获取奖品列表
apiRouter.post('/getPrizeList', prizeCtrl.getPrizeList)
// 添加奖品
apiRouter.post('/addPrize', prizeCtrl.addPrize)
// 删除奖品
apiRouter.post('/deletePrize', prizeCtrl.deletePrize)
// 批量删除奖品
apiRouter.post('/bulkDeletePrize', prizeCtrl.bulkDeletePrize)

module.exports = router => {
  router.use('/admin/prize', apiRouter.routes(), apiRouter.allowedMethods())
}
