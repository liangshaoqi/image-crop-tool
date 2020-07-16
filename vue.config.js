let path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    open: true
  },
  lintOnSave: false, // eslint开关
  chainWebpack: config => {
    // config.entry('main').add('babel-polyfill')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
  }
}