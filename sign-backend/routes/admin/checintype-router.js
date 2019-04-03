const apiRouter = require('koa-router')()
const checkintypeCtrl = require('../../controllers/admin/checkintype-ctrl')

// 获取签到类型列表
apiRouter.post('/getCheckInTypeList', checkintypeCtrl.getCheckInTypeList)
// 根据id获取签到类型
apiRouter.get('/getCheckInTypeById', checkintypeCtrl.getCheckInTypeById)
// 添加签到类型
apiRouter.get('/addCheckInType', checkintypeCtrl.addCheckInType)
// 删除签到类型
apiRouter.get('/deleteCheckInType', checkintypeCtrl.deleteCheckInType)

module.exports = router => {
  router.use('/checkintype', apiRouter.routes(), apiRouter.allowedMethods())
}
