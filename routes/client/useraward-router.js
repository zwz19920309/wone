const apiRouter = require('koa-router')()
const userawardCtrl = require('../../controllers/client/useraward-ctrl')
const verify = require('../../common/utils/verify-util')
// 获取用户奖励
apiRouter.post('/getUserAwardListBySceneId', userawardCtrl.getUserAwardListBySceneId)
// 消费用户奖励
apiRouter.post('/consumeUserAward', userawardCtrl.consumeUserAward)
module.exports = router => {
  router.use('/client/useraward', verify.verify, apiRouter.routes(), apiRouter.allowedMethods())
}
