const hostInfo = require('ip')
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
