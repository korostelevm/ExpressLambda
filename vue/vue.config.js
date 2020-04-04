const path = require('path')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  css: { extract: false },
  configureWebpack: {
    output: {
      filename: 'public/microfrontend.js',
    },
  },
}