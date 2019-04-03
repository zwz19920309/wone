const apiRouter = require('koa-router')()
const signonCtrl = require('../../controllers/client/signon-ctrl')

apiRouter.post('/getSignonList', signonCtrl.getSignonList)
apiRouter.post('/addSignon', signonCtrl.addSignon)
apiRouter.get('/deleteSignon', signonCtrl.deleteSignon)
apiRouter.get('/getSignonList', signonCtrl.getSignonList)

module.exports = router => {
  router.use('/signon', apiRouter.routes(), apiRouter.allowedMethods())
}
