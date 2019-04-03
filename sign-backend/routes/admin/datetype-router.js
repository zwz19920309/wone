const apiRouter = require('koa-router')()
const datetypeCtrl = require('../../controllers/admin/datetype-ctrl')

// 获取签到类型列表
apiRouter.post('/getDateTypeList', datetypeCtrl.getDateTypeList)
// 根据id获取签到类型
apiRouter.get('/getDateTypeById', datetypeCtrl.getDateTypeById)
// 添加签到类型
apiRouter.get('/addDateType', datetypeCtrl.addDateType)
// 删除签到类型
apiRouter.get('/deleteDateType', datetypeCtrl.deleteDateType)

module.exports = router => {
  router.use('/datetype', apiRouter.routes(), apiRouter.allowedMethods())
}
