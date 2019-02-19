const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy
} = require('customize-cra')

module.exports = override(
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
