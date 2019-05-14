const apiRouter = require('koa-router')()
const prizeCtrl = require('../../controllers/admin/prize-ctrl')
const authUtil = require('../../common/utils/auth-util')
// 获取奖品列表
apiRouter.post('/getPrizeList', authUtil.checkAuth, prizeCtrl.getPrizeList)
// 添加奖品
apiRouter.post('/addPrize', prizeCtrl.addPrize)
// 删除奖品
apiRouter.post('/updatePrize', prizeCtrl.updatePrize)
// 批量删除奖品
apiRouter.post('/bulkDeletePrize', prizeCtrl.bulkDeletePrize)

module.exports = router => {
  router.use('/admin/prize', apiRouter.routes(), apiRouter.allowedMethods())
}
