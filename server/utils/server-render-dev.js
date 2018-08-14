const path = require('path')
const MemoryFileSystem = require('memory-fs')
const webpack = require('webpack')
const Router = require('koa-better-router')
const proxy = require('koa-proxies')
const ReactSSR = require('react-dom/server')
const NativeModule = require('module')
const vm = require('vm')
const axios = require('axios')

const webpackServerConfig = require('../../build/webpack-server-config')

const mfs = new MemoryFileSystem()
const serverCompiler = webpack(webpackServerConfig)

let serverBundle
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }

  stats = stats.toJson()
  stats.errors.forEach(err => console.error('webpack err ===>', err))
  stats.warnings.forEach(warn => console.warn('webpack warn ===>', warn))

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf8')

  const m = getModuleFromString(bundle, 'server-entry.js')

  serverBundle = m.exports.default
})

function getModuleFromString (bundle, filename) {
  const m = { exports: {} }

  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename,
    displayErrors: true
  })

  const result = script.runInThisContext()

  result.call(m.exports, m.exports, require, m)

  return m
}

module.exports = (app, config) => {
  app.use(proxy(config.publicPath, {
    target: `http://${config.devHost}:${config.devPort}`,
    logs: true
  }))

  const router = Router().loadMethods()

  router.get('*', async (ctx, next) => {
    if (!serverBundle) {
      ctx.body = '页面正在维护中，请稍后！'
      return next()
    }

    const res = await axios.get(`http://${config.devHost}:${config.devPort}${config.publicPath}/index.html`)

    const routerContext = {}
    const app = serverBundle(routerContext, ctx.url)

    ctx.body = res.data.replace('<!--App-->', ReactSSR.renderToString(app))

    if (routerContext.url) {
      ctx.status = 302
      ctx.redirect(routerContext.url)

      return next()
    }

    return next()
  })

  app.use(router.middleware())
}
