/** @type {import('@remix-run/dev').AppConfig} */
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
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  watchPaths: ['./public'],
  server: './server.ts',
  /**
   * The following settings are required to deploy Hydrogen apps to Oxygen:
   */
  publicPath: (process.env.HYDROGEN_ASSET_BASE_URL ?? '/') + 'build/',
  assetsBuildDirectory: 'dist/client/build',
  serverBuildPath: 'dist/worker/index.js',
  serverMainFields: ['browser', 'module', 'main'],
  serverConditions: ['worker', process.env.NODE_ENV],
  serverDependenciesToBundle: 'all',
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverMinify: process.env.NODE_ENV === 'production',
}
