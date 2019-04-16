const path = require('path')
const router = require('koa-router')()
const routesLoader = require('../common/utils/routesloader')

router.prefix('/bonus')
// 接口中转直连
routesLoader(path.join(__dirname, './client')).then(routes => {
  routes.forEach(route => {
    route(router)
  })
})

routesLoader(path.join(__dirname, './admin')).then(routes => {
  routes.forEach(route => {
    route(router)
  })
})

module.exports = router
