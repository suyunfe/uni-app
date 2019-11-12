module.exports = {
  projectName: '<%- rootOptions.projectName %>',
  dev: {
    // https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    proxy: {
      // t-suyun服务
      '/api/user/user-web-app': {
        target: 'https://suyun-user-stable.djtest.cn',
        pathRewrite: {
          '^/api/user/user-web-app': ''
        }
      },

      '/api/user/list': {
        target: 'http://localhost:8080'
      }
    },
    mock: false,
    allowedHosts: []
  }
}
