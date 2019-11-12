const path = require('path')
// const Config = require('webpack-chain')
const webpackApiMocker = require('mocker-api')
const projectConfig = require('./project-config')
const gitOrigin = require('remote-origin-url')
// const QdebugPlugin = require('qdebug-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const appServerHost = process.env.APP_HOST
const APP_NS = process.env.APP_NS
const gitRemoteUrl = gitOrigin.sync()

const gitGroup = gitRemoteUrl ? gitRemoteUrl.match(/(?<=com:|com\/).+?(?=\/)/)[0] : 'ag' // ag stand for anonymous group
const projectName = gitRemoteUrl ? gitRemoteUrl.match(/(?<=\/)[^\/]+(?=\.git)/)[0] : projectConfig.projectName

module.exports = {
  publicPath: isDev
    ? '/'
    : `//${appServerHost}/fe/static/${gitGroup}/${projectName}/${APP_NS}`,
  // configureWebpack (config) {
  /**
   * Suyun plugin will drop all console in production mode,
   * if you DO NOT need this behavior, uncomment this section below
   */
  // if (APP_NS !== 'online') {
  //   const compressOptions = {
  //     drop_console: false,
  //     drop_debugger: false,
  //     warnings: true,
  //   };

  //   const originCompressOptions =
  //   config.optimization ? config.optimization.minimizer[0].options.terserOptions.compress : {};
  //   Object.assign(originCompressOptions, compressOptions);
  // }

  // if (projectConfig.enableQDebug && APP_NS && APP_NS !== 'online') {
  //   return {
  //     plugins: [
  //       new QdebugPlugin({
  //         filter: [],  // 需要过滤的入口文件
  //         enable: true,
  //       }, {
  //         setOptions: {
  //           evnName:"",
  //         }
  //       })
  //     ]
  //   }
  // }
  // },
  devServer: {
    before (app) {
      if (projectConfig.dev.mock) {
        webpackApiMocker(app, path.resolve('./mock/index.js'))
      }
    }
  }
}
