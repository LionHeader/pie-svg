const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var webpackProdConfig = config => {
  if (process.env.NODE_ENV === 'production') {
    // config.output = {
    //   filename: ''
    // }
    config.plugins.push(
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      })
    )
  }
}

module.exports = webpackProdConfig
