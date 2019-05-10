const apiRouter = require('koa-router')()
const userawardCtrl = require('../../controllers/client/useraward-ctrl')
const verify = require('../../common/utils/verify-util')
// 获取用户奖励
apiRouter.post('/getUserAwardListBySceneId', verify.verify, userawardCtrl.getUserAwardListBySceneId)
// 消费用户奖励
apiRouter.post('/consumeUserAward', verify.verify, userawardCtrl.consumeUserAward)
module.exports = router => {
  router.use('/client/useraward', apiRouter.routes(), apiRouter.allowedMethods())
}
