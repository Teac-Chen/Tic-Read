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
    throw new TypeError('koa-better-serve: expect `pathname` to be string')
  }

  return async (ctx, next) => {
    const filepath = ctx.path.replace(pathname, '')

    if (ctx.method !== 'GET') return next()

    const file = await send(ctx, filepath, options)

    if (!file) {
      next()
    }
  }
}
