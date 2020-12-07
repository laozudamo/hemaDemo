
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/app': {
        target: 'http://ttapi.research.itcast.cn/' 
      },
      
      // websocket 协议跨域配置
    '/socket.io': {
      target: 'ttp://ttapi.research.itcast.cn',
      ws: true,
      changeOrigin: true
      },
    }
  }
}