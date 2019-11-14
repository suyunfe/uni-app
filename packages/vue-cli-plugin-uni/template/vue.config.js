const path = require('path')
// const Config = require('webpack-chain')
const webpackApiMocker = require('mocker-api')
const projectConfig = require('./project-config')

module.exports = {
  devServer: {
    before (app) {
      if (projectConfig.dev.mock) {
        webpackApiMocker(app, path.resolve('./mock/index.js'))
      }
    }
  }
}
