
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
    }
  ])

  return prompts.reduce((acc, cur) => {
    return [...cur, ...acc]
  }, [])
}

module.exports = [
  ...getServerEnvPrompts()
]
