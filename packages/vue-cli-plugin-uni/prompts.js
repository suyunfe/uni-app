
function getServerEnvPrompts () {
  const environments = ['test', 'sandbox', 'online']

  const prompts = environments.map(item => [
    {
      name: `${item}AppServerHost`,
      message: `${item} server host`,
      type: 'input',
      default: '',
      description: `host for the ${item} server, will be used on baseUrl(publicPach)`,
      group: `${item} environment`,
      link: 'https://github.com'
    },
    {
      name: `${item}FTPServerHost`,
      message: `${item} FTP server host`,
      type: 'input',
      default: '',
      description: `host for the ${item} server, not required if using Aliyun OSS`,
      group: `${item} environment`,
      link: 'https://github.com'
    },
    {
      name: `${item}FTPServerPort`,
      message: `${item} FTP server port`,
      type: 'input',
      default: '',
      description: `port for the ${item} server, not required if using Aliyun OSS`,
      group: `${item} environment`,
      link: 'https://github.com'
    },
    {
      name: `${item}FTPServerUsername`,
      message: `${item} FTP server username`,
      type: 'input',
      default: '',
      description: `username for the ${item} server, AccessKeyId/Bucket if using Aliyun OSS`,
      group: `${item} environment`,
      link: 'https://github.com'
    },
    {
      name: `${item}FTPServerPassword`,
      message: `${item} FTP server password`,
      type: 'password',
      default: '',
      description: `password for the ${item} server, AccessSecret if using Aliyun OSS`,
      group: `${item} environment`,
      link: 'https://github.com'
    }
  ])

  return prompts.reduce((acc, cur) => {
    return [...cur, ...acc]
  }, [])
}

module.exports = [
  ...getServerEnvPrompts()
]
