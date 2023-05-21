const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

const { PROJECT_PATH, shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('../constants');

const customCssPath = glob.sync(`${path.resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`);
const antdCssPath = glob.sync(`${path.resolve(PROJECT_PATH, 'node_modules/antd/dist/antd.css')}`);

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    // new PurgeCSSPlugin({
    //   // 需要搜索哪些文件中的无用 CSS 代码
    //   paths: customCssPath,
    //   // 排除 antd/dist/antd.css 文件及其依赖的 CSS 文件
    //   whitelist: ['html', 'body', /^ant-/],
    // }),
    new webpack.BannerPlugin({
      raw: true,
      banner:
        '/** @preserve Powered by react-ts-quick-starter (https://github.com/vortesnail/react-ts-quick-starter) */',
    }),
    shouldOpenAnalyzer && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
});
