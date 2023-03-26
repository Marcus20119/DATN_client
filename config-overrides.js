const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
} = require('customize-cra');
const path = require('path');
// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(
  addDecoratorsLegacy(),
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src'),
  })
);
