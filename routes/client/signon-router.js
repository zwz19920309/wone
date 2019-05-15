const apiRouter = require('koa-router')()
const signonCtrl = require('../../controllers/client/signon-ctrl')
const verify = require('../../common/utils/verify-util')
//  getSelfSignon
apiRouter.post('/getSelfSignon', signonCtrl.getSelfSignon)
// 用户重新签到
apiRouter.post('/reSignon', signonCtrl.reSignon)
// 根据id获取模板
apiRouter.post('/userSignon', signonCtrl.userSignon)
module.exports = router => {
  router.use('/client/signon', verify.verify, apiRouter.routes(), apiRouter.allowedMethods())
}
