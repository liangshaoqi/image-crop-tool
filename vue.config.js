let path = require('path');
let CompressionPlugin = require('compression-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    open: true,
  },
  productionSourceMap: false,
  lintOnSave: false, // eslint开关
  chainWebpack: (config) => {
    // config.entry('main').add('babel-polyfill')
    config.resolve.alias.set('@', resolve('src')).set('src', resolve('src'));
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            // 压缩文件
            test: /\.js$|\.html$|\/.css|/, // 匹配文件名
            threshold: 20 * 1024, // 对超过20k的数据进行压缩
            deleteOriginalAssets: false, // 是否删除源文件
          }),
        ],
      };
    }
  },
};
