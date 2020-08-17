// const path = require('path')

module.exports = {
  outputDir: 'lib',
  css: {
    extract: false
  },
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      index: 'E:\\npm-package\\pie-svg\\packages\\index.js'
    },
    output: {
      libraryExport: 'default',
      libraryTarget: 'umd',
      filename: 'pie-svg.min.js'
    }
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
