const apiRouter = require('koa-router')()
const sceneCtrl = require('../../controllers/admin/scene-ctrl')

// 获取场景列表
apiRouter.post('/getSceneList', sceneCtrl.getSceneList)
// 添加场景
apiRouter.post('/addScene', sceneCtrl.addScene)

module.exports = router => {
  router.use('/admin/scene', apiRouter.routes(), apiRouter.allowedMethods())
}
