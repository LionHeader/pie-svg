// Vue.config.js
const PKG = process.env.VUE_APP_PKG
const devConfig = require('./webpack.dev')
const pkgConfig = require('./webpack.pkg')

module.exports = PKG === 'pkg' ? pkgConfig : devConfig
