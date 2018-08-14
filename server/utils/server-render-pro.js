const Router = require('koa-better-router')
const ReactSSR = require('react-dom/server')
const fs = require('fs')

const staticPath = require('./static-path')
const bundle = require('../../dist/js/server-entry').default


module.exports = (app, config) => {
  const router = Router().loadMethods()
  const html = fs.readFileSync(`${config.path}/index.html`, 'utf8')

  app.use(staticPath(config.path, config.publicPath))

  router.get('*', (ctx, next) => {
    const routerContext = {}
    const app = bundle(routerContext, ctx.url)
    ctx.body = html.replace('<!--App-->', ReactSSR.renderToString(app))

    if (routerContext.url) {
      ctx.status = 301
      ctx.redirect(routerContext.url)

      return next()
    }

    return next()
  })

  app.use(router.middleware())
}
