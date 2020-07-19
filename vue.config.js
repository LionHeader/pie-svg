// Vue.config.js
const hostInfo = require('ip')
const webpackProdConfig = require('./webpack.prod')
module.exports = {
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
    proxy: {
      // target: 'targetHost',
      // changeOrigin: true,
      // pathRewrite: {
      //   '^dev': '/'
      // }
    },
    clientLogLevel: 'warning'
  },
  css: {
    // loaderOptions: {
    //   sass: {
    //     prependData: '@import "@/assets/scss/public.scss";' // 新版sass-loader
    //   }
    // }
  }
}