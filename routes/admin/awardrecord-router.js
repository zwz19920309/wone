const apiRouter = require('koa-router')()
const awardrecordCtrl = require('../../controllers/admin/awardrecord-ctrl')

// 获取奖品列表
apiRouter.post('/getAwardRecordList', awardrecordCtrl.getAwardRecordList)

module.exports = router => {
    router.use('/admin/awardrecord', apiRouter.routes(), apiRouter.allowedMethods())
}
