const Router = require('koa-better-router')
const ReactSSR = require('react-dom/server')
const fs = require('fs')

const staticPath = require('./static-path')
const bundle = require('../../dist/js/server-entry').default
const config = require('../../config').server

const html = fs.readFileSync(`${config.path}/index.html`, 'utf8')

module.exports = app => {
  const router = Router().loadMethods()

  app.use(staticPath(config.path, config.publicPath))

  router.get('*', ctx => {
    ctx.body = html.replace('<!--App-->', ReactSSR.renderToString(bundle))
  })

  app.use(router.middleware())
}
