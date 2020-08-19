const hostInfo = require('ip')
const path = require('path')
const webpackProdConfig = require('./webpack.prod')

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出的html 文件路径
      filename: 'index.html'
    }
  },
  configureWebpack: config => {
    webpackProdConfig(config)
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.module.rule('images').use('url-loader')
      .tap(args => {
        args.limit = 10240
        return args
      })
    if (process.env.NODE_ENV === 'test') {
      config.merge({
        devtool: 'eval'
      })
      config.module
        .rule('istanbul')
        .test(/\.(js|vue)$/)
        .include
        .add(path.resolve(__dirname, '/package'))
        .end()
        .use('istanbul-instrumenter-loader')
        .loader('istanbul-instrumenter-loader')
        .options({ esModules: true })
        .before('babel-loader')
    }
  },
  integrity: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  publicPath: './',
  assetsDir: 'static',
  outputDir: 'dist',
  devServer: {
    host: hostInfo.address(),
    port: 2020,
    open: true,
    clientLogLevel: 'warning'
  }
}
