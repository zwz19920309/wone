const apiRouter = require('koa-router')()
const userCtrl = require('../../controllers/client/user-ctrl')

apiRouter.get('/userList', userCtrl.userList)

module.exports = router => {
  router.use('/user', apiRouter.routes(), apiRouter.allowedMethods())
}
