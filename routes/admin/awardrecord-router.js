const apiRouter = require('koa-router')()
const awardrecordCtrl = require('../../controllers/admin/awardrecord-ctrl')
const authUtil = require('../../common/utils/auth-util')
// 获取奖品列表
apiRouter.post('/getAwardRecordList', awardrecordCtrl.getAwardRecordList)

module.exports = router => {
  router.use('/admin/awardrecord', authUtil.checkAuth, apiRouter.routes(), apiRouter.allowedMethods())
}
