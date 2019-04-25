// require('./models')
const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
// const json = require('koa-json')
const onerror = require('koa-onerror')
const koastatic = require('koa-static')
const koaBody = require('koa-body')
// const bodyparser = require('koa-bodyparser')
const config = require('./config/config')
const path = require('path')
// const logger = require('koa-logger')
const logUtil = require('./common/utils/log-utils')
const index = require('./routes/index')
const cors = require('koa2-cors')
// error handler
onerror(app)
// 静态资源目录对于相对入口文件index.js的路径
app.use(koastatic(path.join(__dirname, config.staticPath), { maxage: 7 * 86400 * 1000 }))

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
// // middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart: true,
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb',
  formidable: {
    uploadDir: path.join(__dirname, 'dist'),
    keepExtensions: true,
    hash: 'sha1'
  },
  onError() {
    console.log(arguments)
  }
}))

// app.use(json())
// app.use(logger())
// app.use(require('koa-static')(path.join(__dirname, '/public')))

// app.use(views(path.join(__dirname, '/views'), {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  try {
    await next()
    let ms = new Date() - start
    console.log('ms: ', ms)
    // 记录响应日志
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    let ms = new Date() - start
    // 记录异常日志
    console.log(error)
    ctx.throw(503, logUtil.logError(ctx, error, ms))
  }
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
module.exports = app
