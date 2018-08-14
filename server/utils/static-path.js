const send = require('koa-send')
const kindOf = require('kind-of')

module.exports = (root, pathname, options) => {
  if (kindOf(root) === 'undefined') {
    throw new TypeError('`root` is required, but got undefined')
  }

  if (kindOf(pathname) === 'object') {
    options = pathname
    pathname = '/'
  }

  options = kindOf(options) === 'object' ? options : null
  options = Object.assign({ root }, options)

  pathname = pathname || '/'

  if (kindOf(pathname) !== 'string') {
    throw new TypeError('static-path: expect `pathname` to be string')
  }
  pathname = pathname.replace(/(\/)/g, '\\$1')
  const reg = new RegExp(`^(${pathname})`)

  return async (ctx, next) => {
    if (ctx.method !== 'GET' && ctx.method !== 'HEAD') return next()

    let filepath
    if (reg.test(ctx.path)) {
      filepath = ctx.path.replace(reg, '')
    } else {
      return next()
    }


    try {
      const file = await send(ctx, filepath, options)

      if (!file) {
        return next()
      }
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }
}
