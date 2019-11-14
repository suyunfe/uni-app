module.exports = (api, options, rootOptions) => {
  const mainVersion = require('./package.json').uniappVersion
  const version = '^' + mainVersion
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      scripts: {
        'info': 'node node_modules/@dcloudio/vue-cli-plugin-uni/commands/info.js',
        'serve': 'npm run dev:h5',
        'build:test': 'npm run build:h5:test',
        'build:sandbox': 'npm run build:h5:sandbox',
        'build:online': 'npm run build:h5:online',
        'dev:h5': 'cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service kguni-serve',
        'dev:mp-qq': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-qq vue-cli-service uni-build --watch',
        'dev:mp-weixin': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch',
        'dev:mp-baidu': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-baidu vue-cli-service uni-build --watch',
        'dev:mp-alipay': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-alipay vue-cli-service uni-build --watch',
        'dev:mp-toutiao': 'cross-env NODE_ENV=development UNI_PLATFORM=mp-toutiao vue-cli-service uni-build --watch',
        'build:h5:test': 'cross-env NODE_ENV=production UNI_PLATFORM=h5 APP_NS=test vue-cli-service kguni-build --mode test',
        'build:h5:sandbox': 'cross-env NODE_ENV=production UNI_PLATFORM=h5 APP_NS=sandbox vue-cli-service kguni-build --mode sandbox',
        'build:h5:online': 'cross-env NODE_ENV=production UNI_PLATFORM=h5 APP_NS=online vue-cli-service kguni-build --mode online',
        'build:mp-qq': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-qq vue-cli-service uni-build',
        'build:mp-weixin': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni-build',
        'build:mp-baidu': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-baidu vue-cli-service uni-build',
        'build:mp-alipay': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-alipay vue-cli-service uni-build',
        'build:mp-toutiao': 'cross-env NODE_ENV=production UNI_PLATFORM=mp-toutiao vue-cli-service uni-build',
        'dev:custom': 'cross-env NODE_ENV=development uniapp-cli custom',
        'deploy:test': 'npm run deploy:h5:test',
        'deploy:sandbox': 'npm run deploy:h5:sandbox',
        'deploy:h5:sandbox': 'cross-env UNI_PLATFORM=h5 APP_NS=sandbox vue-cli-service deploy --mode sandbox --source dist/build/h5',
        'deploy:h5:test': 'cross-env UNI_PLATFORM=h5 APP_NS=test vue-cli-service deploy --mode test --source dist/build/h5',
        'release:test': 'npm run build:test && npm run deploy:test',
        'release:sandbox': 'npm run build:sandbox && npm run deploy:sandbox',
        'build:custom': 'cross-env NODE_ENV=production uniapp-cli custom'
      },
      'uni-app': {
        'scripts': {}
      },
      dependencies: {
        '@dcloudio/uni-app-plus': version,
        '@dcloudio/uni-h5': version,
        '@dcloudio/uni-mp-qq': version,
        '@dcloudio/uni-mp-weixin': version,
        '@dcloudio/uni-mp-baidu': version,
        '@dcloudio/uni-mp-alipay': version,
        '@dcloudio/uni-mp-toutiao': version,
        '@dcloudio/uni-stat': version,
        'flyio': '^0.6.2',
        'vuex': '^3.0.1'
      },
      devDependencies: {
        '@dcloudio/uni-cli-shared': version,
        '@dcloudio/uni-template-compiler': version,
        '@dcloudio/vue-cli-plugin-hbuilderx': version,
        '@dcloudio/vue-cli-plugin-uni': version,
        '@dcloudio/vue-cli-plugin-uni-optimize': version,
        '@dcloudio/webpack-uni-mp-loader': version,
        '@dcloudio/webpack-uni-pages-loader': version,
        'babel-plugin-import': '^1.11.0',
        'mockjs': '^1.0.1-beta3',
        'express': '^4.16.4',
        'mocker-api': '^1.6.6',
        'remote-origin-url': '^2.0.0'
      },
      browserslist: [
        'Android >= 4',
        'ios >= 8'
      ]
    }
  })
  api.render('./template', options)
}
