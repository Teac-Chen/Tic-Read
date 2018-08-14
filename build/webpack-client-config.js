const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack-base-config')
const config = require('../config').client
const isDev = process.env.NODE_ENV === 'development'
const configPath = isDev ? 'dev' : 'pro'

const options = merge(baseConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[hash:5].js',
    path: config[configPath].path,
    publicPath: config[configPath].publicPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tic-Read',
      template: path.resolve(__dirname, '../index.html'),
      filename: path.join(config[configPath].path, 'index.html'),
      favicon: config[configPath].favicon
    })
  ]
})

if (isDev) {
  options.devServer = {
    host: config[configPath].host,
    port: config[configPath].port,
    open: config[configPath].autoOpenBrower,
    hot: true,
    contentBase: config[configPath].path,
    publicPath: config[configPath].publicPath,
    historyApiFallback: {
      index: `${config[configPath].publicPath}index.html`
    }
  }

  options.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = options
