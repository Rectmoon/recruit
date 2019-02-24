const {
  override,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  overrideDevServer,
  watchAll
} = require('customize-cra')

const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  webpack: override(
    override(
      addWebpackAlias({
        '@': resolve('src')
      }),

      fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css'
      }),

      addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': 'orange' }
      }),

      addDecoratorsLegacy()
    )
  ),

  devServer: overrideDevServer(config => {
    config.proxy = {
      '/user': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
    return config
  })
}
