const Koa = require('koa')

const config = require('../config').server

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

const host = process.env.HOST || config.host
const port = process.env.PORT || config.port

app.on('error', err => {
  console.log('server error', err)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()

  const ms = Date.now() - start

  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`)

  ctx.set('X-Response-time', `${ms}ms`)
})

if (!isDev) {
  require('./utils/server-render-pro')(app, config)
} else {
  require('./utils/server-render-dev')(app, config)
}

app.listen(port)

console.log(`listening on port ${host}:${port}`)
