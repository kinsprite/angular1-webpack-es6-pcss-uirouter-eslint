/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const os = require('os');

const WebpackChunkHash = require('webpack-chunk-hash');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const conf = require('./gulp.conf');
const baseConfig = require('./webpack-base.conf');
const copyConfig = require('./webpack-copy.conf');

module.exports = function webpackDistConf(env) {
  return webpackMerge(baseConfig(env), copyConfig(env), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(conf.webpackEnv.dist.name),
      }),
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest',
      }),
    ],
    devtool: 'source-map', // 'cheap-module-source-map' 会造成 js map 文件失效
    output: {
      path: path.join(process.cwd(), conf.paths.dist),
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    performance: {
      hints: 'error',
      maxEntrypointSize: 3200000,
      maxAssetSize: 250000,
    },
    // 定义从外部 CDN 加载模块
    // externals: {
    //   jquery: 'jQuery'
    // }
  });
};
