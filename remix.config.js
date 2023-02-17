const { withEsbuildOverride } = require('remix-esbuild-override')
const styledComponentsPlugin = require('./styled-components-esbuild-plugin')

withEsbuildOverride(option => {
  option.plugins.unshift(styledComponentsPlugin())

  return option
})

module.exports = {
  future: {
    unstable_cssModules: true,
  },
}
