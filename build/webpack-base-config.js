const path = require('path')
const webpack = require('webpack')

const options = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'views': path.resolve(__dirname, '../src/views')
    }
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

module.exports = options
