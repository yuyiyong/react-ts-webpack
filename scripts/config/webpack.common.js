const path = require('path')
const resolve = path.resolve
const { PROJECT_PATH, isDev } = require('../constants')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const getClientEnvironment = require('./env')
// const paths = require('./paths');
const env = getClientEnvironment('')
const px2rem = require('postcss-pxtorem')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const getCssLoaders = (importLoaders) => [
  isDev
    ? 'style-loader'
    : // 'style-loader',
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false, // 使用commonjs规范解析css，require引入可以不加.default
          publicPath: '../../', // 使url的查找路径为dist根路径
        },
      },
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
      modules: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          !isDev && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: false,
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
        ].filter(Boolean),
      },
    },
  },
]

module.exports = {
  target: 'web',
  // target: 'node',
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name].[hash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },

  plugins: [
    // new NodePolyfillPlugin({
    //   excludeAliases: ["console"]
    // }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin(env.stringified),
    // new HardSourceWebpackPlugin(), // 过时

    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: isDev ? '#52c41a' : '#722ed1',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: true,
      // minify: isDev
      //   ? false
      //   : {
      //       removeAttributeQuotes: true,
      //       collapseWhitespace: true,
      //       removeComments: true,
      //       collapseBooleanAttributes: true,
      //       collapseInlineTagWhitespace: true,
      //       removeRedundantAttributes: true,
      //       removeScriptTypeAttributes: true,
      //       removeStyleLinkTypeAttributes: true,
      //       minifyCSS: true,
      //       minifyJS: true,
      //       minifyURLs: true,
      //       useShortDoctype: true,
      //     },
    }),
    new CopyPlugin({
      patterns: [
        {
          context: resolve(PROJECT_PATH, './public'),
          from: '*',
          to: resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
  // other...
  resolve: {
    aliasFields: ['browser'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      buffer: 'buffer',
      https: 'https-browserify',
      http: 'https-browserify',
      Src: resolve(PROJECT_PATH, './src'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
      App: resolve(PROJECT_PATH, './'),
      assert: resolve(PROJECT_PATH, './assert.ts'),
      path: resolve(PROJECT_PATH, './node_modules/path-browserify'),
    },
    fallback: {
      // crypto: false,
      // stream: require.resolve('stream-browserify'),
      // buffer: require.resolve('buffer'),
      // assert: false,
      // util: false,
      // http: false,
      // https: false,
      // os: false,
      fs: false,
      // "path": require.resolve("path-browserify"),
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  // 将这种第三方包剥离出去或者采用 CDN 链接形式
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
