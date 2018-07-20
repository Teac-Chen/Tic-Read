const path = require('path')
const webpack = require('webpack')

const config = require('../config').server
const isDev = process.env.NODE_ENV === 'development'

const options = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: path.resolve(__dirname, '../src/server-entry.js'),
  output: {
    filename: 'js/server-entry.js',
    path: config.path,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

module.exports = options
