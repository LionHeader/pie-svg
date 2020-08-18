// const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  outputDir: 'lib',
  css: {
    extract: false
  },
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      index: './packages/index.js'
    },
    output: {
      libraryExport: 'default',
      libraryTarget: 'umd',
      library: 'vueExtend',
      filename: 'index.js',
      umdNamedDefine: true // 若使用export default导出的，则需要配置该项值，方可打包之后按需加载
    },
    plugins: [
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
        cssProcessorOptions: { safe: true }
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')
  }
}
