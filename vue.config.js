const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}


module.exports = {
  //开发模式注释
  // publicPath: '/miaomiao',
  // devServer: {
  //   proxy: {

  //   }
  // },

  chainWebpack: (config) => {
    //set第一个参数：设置的别名，第二个参数：设置的路径
    config.resolve.alias
      .set('@', resolve('./src'))
  }
}