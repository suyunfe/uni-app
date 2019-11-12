const url = require('url')
const path = require('path')

module.exports = (api, options) => {
  api.registerCommand('deploy', {
    description: 'deploy h5 via aliyun-oss',
    usage: 'vue-cli-service deploy [options]',
    options: {
      '--source': `Specifies the local directory to deploy (default: ${
        options.outputDir
      })`,
      '--mode': `specify server env mode, test | sandbox | online (default: test)`,
      '--region': `specify region of Aliyun OSS (default: oss-cn-beijing)`
    }
  },
  args => {
    deploy(args, api, options)
  })
}

async function deploy (args, api, options) {
  const chalk = require('chalk')
  const globby = require('globby')
  const { log, error, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')
  const validate = ([environmentVariable, key]) => {
    if (!environmentVariable) {
      log(chalk.red(`[@suyunfe/vue-cli-plugin-uni ERR!] No ${chalk.yellow(key)} defined in .env file or script.`))
      process.exit(1)
    }
  }

  if (process.env.UNI_PLATFORM !== 'h5') {
    const e = new Error('deploy should be used for platform h5 only')
    stopSpinner(false)
    error(e)
    process.exit(1)
  }

  log()
  const APP_NS = process.env.APP_NS
  const FTP_USERNAME = process.env.FTP_USERNAME
  const FTP_PASSWORD = process.env.FTP_PASSWORD
  const targetSourceDir = api.resolve(args.source || options.outputDir)
  // we use options.publicPath to generate aliyun oss objectkey
  const objectBasePath = options.publicPath.startsWith('http') ? options.publicPath : `http:${options.publicPath}`
  const objectUrlObj = url.parse(objectBasePath)
  // aliyun oss objectkey
  const objectKey = objectUrlObj.pathname.startsWith('/') ? objectUrlObj.pathname.substring(1) : objectUrlObj.pathname;

  // validate
  [
    [APP_NS, 'APP_NS'],
    [FTP_USERNAME, 'FTP_USERNAME'],
    [FTP_PASSWORD, 'FTP_PASSWORD']
  ].forEach(validate)

  logWithSpinner('🍩', `Deploying project at ${chalk.yellow(args.mode)} server\n`)

  const accessKeyId = FTP_USERNAME.split('/')[0]
  const accessKeySecret = FTP_PASSWORD
  const region = args.region || 'oss-cn-beijing'
  const bucket = FTP_USERNAME.split('/')[1]

  const OSS = require('ali-oss')
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
  })

  const files = globby.sync('**', { cwd: api.resolve(`${targetSourceDir}`) })

  for (const file of files) {
    try {
      const objectName = path.join(objectKey, file).replace(/\\/g, '/')
      const localFile = `${targetSourceDir}/${file}`
      await client.put(objectName, localFile)
    } catch (e) {
      stopSpinner(false)
      error(e)
      process.exit(1)
    }
  }

  stopSpinner(true)

  if (args.mode === 'test') {
    log(`Deploy ${files.length} files successfully. 🚚`)
  } else {
    log(
      `Deploy ${
        files.length
      } files successfully. 🚚, homepage is ready to to be deployed at ${chalk.cyan(
        `http://djoy.daojia-inc.com`
      )}`
    )
  }
}

module.exports.defaultModes = {
  deploy: 'test'
}
