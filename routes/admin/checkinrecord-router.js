const apiRouter = require('koa-router')()
const checkinrecordCtrl = require('../../controllers/admin/checkinrecord-ctrl')

// 获取签到类型列表
apiRouter.post('/getCheckinrecordList', checkinrecordCtrl.getCheckinrecordList)
// 根据id获取签到类型
apiRouter.get('/getCheckinrecordById', checkinrecordCtrl.getCheckinrecordById)
// 添加签到类型
apiRouter.get('/addCheckinrecord', checkinrecordCtrl.addCheckinrecord)
// 删除签到类型
apiRouter.get('/deleteCheckinrecord', checkinrecordCtrl.deleteCheckinrecord)

module.exports = router => {
  router.use('/admin/checkinrecord', apiRouter.routes(), apiRouter.allowedMethods())
}
