const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { PROJECT_PATH, openAnalyzer } = require('../constants')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')

const port = () => {
  console.log('11111-2--prod---')
  return 8888
}
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),

    openAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server', // 开一个本地服务查看报告
        analyzerHost: '127.0.0.1', // host 设置
        // analyzerHost: '0.0.0.0', // host 设置
        analyzerPort: port(), // 端口号设置
      }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
    // }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          // compress: { pure_funcs: ['console.log'] },
        },
      }),
      new CssMinimizerPlugin(),
    ].filter(Boolean),
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
})

// const { merge } = require('webpack-merge')
// const common = require('./webpack.common.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// const { PROJECT_PATH, openAnalyzer } = require('../constants')
// const TerserPlugin = require('terser-webpack-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const webpack = require('webpack')
// console.log("----prod------");

// module.exports = merge(common, {
//   // mode: 'production',
//   devtool: false,
//   plugins: [
//     new CleanWebpackPlugin(),
//     // new MiniCssExtractPlugin({
//     //   filename: 'css/[name].[contenthash:8].css',
//     //   chunkFilename: 'css/[name].[contenthash:8].chunk.css',
//     // }),

//       new BundleAnalyzerPlugin({
//         analyzerMode: 'server', // 开一个本地服务查看报告
//         analyzerHost: '127.0.0.1', // host 设置
//         analyzerPort: 8888, // 端口号设置
//       }),
//     // new PurgeCSSPlugin({
//     //   paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
//     // }),
//   ].filter[Boolean],
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         extractComments: false,
//         terserOptions: {
//           // compress: { pure_funcs: ['console.log'] },
//         },
//       }),
//       new CssMinimizerPlugin(),
//     ].filter(Boolean),
//     splitChunks: {
//       chunks: 'all',
//       minSize: 0,
//     },
//   },
// })
