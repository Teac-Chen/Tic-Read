const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('../config').client
const isDev = process.env.NODE_ENV === 'development'
const configPath = isDev ? 'dev' : 'pro'

const options = {
  mode: process.env.NODE_ENV,
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[hash:5].js',
    path: config[configPath].path,
    publicPath: config[configPath].publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: path.resolve(__dirname, '../node_modules')
      }, {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tic-Read',
      template: path.resolve(__dirname, '../index.html'),
      filename: path.join(config[configPath].path, 'index.html'),
      favicon: config[configPath].favicon
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

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
