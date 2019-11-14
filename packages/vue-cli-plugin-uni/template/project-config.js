const gitOrigin = require('remote-origin-url')

const isDev = process.env.NODE_ENV === 'development'
const appServerHost = process.env.APP_HOST
const APP_NS = process.env.APP_NS
const gitRemoteUrl = gitOrigin.sync()

const gitGroup = gitRemoteUrl ? gitRemoteUrl.match(/(?<=com:|com\/).+?(?=\/)/)[0] : 'ag' // ag stand for anonymous group
const projectName = gitRemoteUrl ? gitRemoteUrl.match(/(?<=\/)[^\/]+(?=\.git)/)[0] : '<%- rootOptions.projectName %>'

module.exports = {
  projectName: '<%- rootOptions.projectName %>',
  publicPath: isDev
    ? '/'
    : `//${appServerHost}/fe/static/${gitGroup}/${projectName}/${APP_NS}`,
  dev: {
    // https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    proxy: {
      '/prefix/api/user/list': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/prefix': ''
        }
      }
    },
    mock: false
  }
}
