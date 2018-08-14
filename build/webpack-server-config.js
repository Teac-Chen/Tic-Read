const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack-base-config')
const config = require('../config').server
const isDev = process.env.NODE_ENV === 'development'

const options = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '../src/server-entry.js'),
  output: {
    filename: 'js/server-entry.js',
    path: config.path,
    libraryTarget: 'commonjs2'
  }
})

module.exports = options
