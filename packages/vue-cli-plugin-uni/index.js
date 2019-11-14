const {
  manifestPlatformOptions
} = require('./lib/env')

const {
  assetsDir
} = require('./lib/copy-webpack-options')

require('./lib/check-update')()

const initBuildCommand = require('./commands/build')
const initServeCommand = require('./commands/serve')
const initDeployCommand = require('./commands/deploy')

module.exports = (api, options) => {
  const projectConfig = require(api.resolve('project-config'))

  initServeCommand(api, options)
  initBuildCommand(api, options)
  initDeployCommand(api, options)

  const platformOptions = require('./lib/' + process.env.UNI_PLATFORM)

  Object.assign(options, { // TODO 考虑非 HBuilderX 运行时，可以支持自定义输出目录
    outputDir: process.env.UNI_OUTPUT_TMP_DIR || process.env.UNI_OUTPUT_DIR,
    assetsDir
  }, platformOptions.vueConfig, {
    publicPath: process.env.NODE_ENV === 'production' ? projectConfig.publicPath : '/'
  })

  require('./lib/options')(options)
  api.configureWebpack(require('./lib/configure-webpack')(platformOptions, manifestPlatformOptions, options))
  api.chainWebpack(require('./lib/chain-webpack')(platformOptions))
}

module.exports.defaultModes = {
  'kguni-serve': 'development',
  'kguni-build': process.env.NODE_ENV,
  'deploy': 'test'
}
