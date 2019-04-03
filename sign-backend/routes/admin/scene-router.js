const apiRouter = require('koa-router')()
const sceneCtrl = require('../../controllers/admin/scene-ctrl')

// 获取场景列表
apiRouter.post('/getSceneList', sceneCtrl.getSceneList)
// 根据id获取场景
apiRouter.get('/getSceneById', sceneCtrl.getSceneById)
// 添加场景
apiRouter.post('/addScene', sceneCtrl.addScene)
// 删除场景
apiRouter.get('/deleteScene', sceneCtrl.deleteScene)

module.exports = router => {
  router.use('/admin/scene', apiRouter.routes(), apiRouter.allowedMethods())
}
