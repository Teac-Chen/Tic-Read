const path = require('path')

module.exports = {
  client: {
    dev: {
      host: '0.0.0.0',
      port: 2018,
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/static/',
      favicon: path.resolve(__dirname, '../favicon.ico'),
      autoOpenBrower: false
    },
    pro: {
      path: path.resolve(__dirname, '../dist'),
      favicon: path.resolve(__dirname, '../favicon.ico'),
      publicPath: '/static/'
    }
  },
  server: {
    host: 'localhost',
    port: 2020,
    devHost: 'localhost',
    devPort: 2018,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static'
  }
}
