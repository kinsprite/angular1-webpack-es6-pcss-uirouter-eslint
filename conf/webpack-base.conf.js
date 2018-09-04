/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const webpack = require('webpack');
const path = require('path');
const assign = require('object-assign');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const InlineManifestJsonWebpackPlugin = require('./inline-manifest-json.webpack.plugin');
const conf = require('./gulp.conf');

// const pkg = require('../package.json');
const stylelintOptions = require('./stylelint-options.conf');
const cssLoaders = require('./css-loaders.conf');

const urlLoaderLimit = 2000; // 内嵌 font/svg/png 大小限制
const MB = 1024 * 1024;

module.exports = function webpackBaseConf(env) {
  function isProduction() {
    return (env.name === conf.webpackEnv.dist.name);
  }

  function isTest() {
    return (env.name === conf.webpackEnv.test.name);
  }

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/, /src.libs?/],
          use: [
            'eslint-loader',
          ],
          enforce: 'pre',
        },
        {
          test: /\.html?$/,
          exclude: [/node_modules/, /src.libs?/],
          use: [
            'htmlhint-loader',
          ],
          enforce: 'pre',
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
        },
        {
          //  普通图像
          test: /\.(jpe?g|png|gif)$/,
          exclude: [/\.tmp.\.sprites/, /node_modules.leaflet/],
          use: [{
            loader: 'file-loader',
            options: {
              // use HASH file name for 'production
              name: isProduction() ? '[name].[hash].[ext]' : '[path][name].[ext]',
              outputPath: 'images/',
              // publicPath: 'images/',
            },
          }],
        },
        {
          // Sprites 图像
          test: /\.tmp.\.sprites.+\.(jpe?g|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              // use HASH file name for 'production
              name: isProduction() ? 'sprite.[hash].[ext]' : '[path][name].[ext]',
              outputPath: 'images/',
              // publicPath: 'images/',
            },
          }],
        },
        {
          //  Leaflet图标，需特殊处理，其使用js替换css class中的url().
          test: /node_modules.leaflet.+\.(jpe?g|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Leaflet 图标js加载不可添加 HASH
              outputPath: 'images/leaflet/',
              // publicPath: 'images/leaflet/',
            },
          }],
        },
        {
          // 字体
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name].[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'fonts/',
            // publicPath: 'fonts/',
          },
        },
        {
          // 普通图像 SVG
          test: /\.svg$/,
          exclude: /(glyphicons|\.tmp.\.sprites).*\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name].[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'images/',
            // publicPath: 'images/',
          },
        },
        {
          // Sprites SVG
          test: /\.tmp.\.sprites.+\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? 'sprite.[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'images/',
            // publicPath: 'images/',
          },
        },
        {
          // 字体 SVG
          test: /glyphicons.*\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name].[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'fonts/',
            // publicPath: 'fonts/',
          },
        },
        {
          test: /\.p?css$/,
          exclude: /mock-api-n-css-module/,
          use: [isProduction() ? MiniCssExtractPlugin.loader : 'style-loader'].concat(
            cssLoaders.pcss(isProduction(), false),
          ),
        },
        {
          test: /mock-api-n-css-module.+\.p?css$/,
          use: [isProduction() ? MiniCssExtractPlugin.loader : 'style-loader'].concat(
            cssLoaders.pcss(isProduction(), true),
          ),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              interpolate: 'true',
              minimize: isProduction(),
              caseSensitive: false,
              collapseWhitespace: true,
              conservativeCollapse: false,
              decodeEntities: true,
              html5: true,
              minifyJS: true,
              minifyCSS: true,
            },
          }],
        },
        {
          test: /\.modernizrrc.js$/,
          use: [
            'modernizr-loader',
          ],
        },
      ],
    },
    plugins: (function (isTestArg) {
      const plugins = [
        new HtmlWebpackPlugin({
          minify: isProduction()
            ? { collapseBooleanAttributes: true, collapseWhitespace: true, removeComments: true }
            : false,
          template: conf.path.src('index.ejs'),
        }),
        new HtmlWebpackIncludeAssetsPlugin({
          assets: [
            // 'lib/3rd/bootstrap/3.3.7/css/bootstrap.min.css',
            // 'lib/3rd/bootstrap/3.3.7/css/bootstrap-theme.min.css',
            // 'lib/3rd/bootstrap/3.3.7/js/bootstrap.min.js',
          ],
          append: false,
        }),
        new MiniCssExtractPlugin({
          filename: isProduction() ? '[name].[contenthash].css' : '[name].css',
          chunkFilename: isProduction() ? '[name].[contenthash].css' : '[name].[id].css',
        }),
        // new ChunkManifestPlugin({
        //   filename: 'chunk-manifest.json',
        //   manifestVariable: 'webpackManifest',
        // }),
        // new InlineManifestJsonWebpackPlugin({
        //   filename: 'chunk-manifest.json',
        //   manifestJsonVariable: 'webpackManifestJson',
        // }),
        new DuplicatePackageCheckerPlugin(),
        new ManifestPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //   debug: !isProduction(),
        // }),
        new StylelintWebpackPlugin(assign({
          files: ['**/*.?(p|s)css'],
        }, stylelintOptions.scss)),
        new webpack.ProvidePlugin({
          // ***
          // *** Webpack碰到全局变量 $ 时, 查找到指定的模块 'jquery'
          // ***
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery', // for Angular 1.x
        }),
      ];

      return plugins;
    }(isTest())),
    resolve: {
      alias: {
        // ***
        // *** Webpack 查找模块/文件时，使用 alias 去替换文件路径.
        // ***
        jquery: 'jquery/dist/jquery.js',
        // 'bootstrap': 'bootstrap/dist/js/bootstrap.js',
        'bootstrap.css': 'bootstrap/dist/css/bootstrap.css', // 点号(.)相对于 gulp 执行目录
        'leaflet.css': 'leaflet/dist/leaflet.css',
        modernizr$: path.resolve(__dirname, '.modernizrrc.js'),
      },
      extensions: ['.js'],
    },
    entry: {
      // ***
      // *** 在目标 HTML 中以几个模块加载(js/css)
      // ***
      // polyfills: `./${conf.path.src('polyfills')}`,
      app: [
        'bootstrap.css',
        'leaflet.css',
        `./${conf.path.src('index.pcss')}`,
        `./${conf.path.src('polyfills')}`,
        `./${conf.path.src('index')}`,
      ],
      // 'babel-polyfill': ['babel-polyfill'],
      // vendor: Object.keys(pkg.dependencies),
      // 'vendor-base': ['jquery', 'bootstrap', 'bootstrap.css'],
      // 'vendor-angular': ['angular', 'angular-animate', 'angular-sanitize'],
      // 'vendor-ui-router': ['@uirouter/angularjs'],
      // 'vendor-ng-ui': ['angular-translate', 'angular-ui-bootstrap'],
      // 'vendor-leaflet': ['leaflet', ],
      // 'vendor-d3': ['d3'],
    },
    externals: {
      // 'babel-polyfill': 'babel-polyfill',
      // '@uirouter/angularjs': {
      //   commonjs: 'angular-animate',
      //   commonjs2: 'angular-animate',
      //   amd: 'angular-animate',
      // },
      // angular: 'angular',
      // d3: 'd3',
      // 'angular-animate': {
      //   commonjs: 'angular-animate',
      //   commonjs2: 'angular-animate',
      //   amd: 'angular-animate',
      // },
      // 'angular-sanitize': {
      //   commonjs: 'angular-sanitize',
      //   commonjs2: 'angular-sanitize',
      //   amd: 'angular-sanitize',
      // },
      // 'angular-ui-router': {
      //   commonjs: 'angular-ui-router',
      //   commonjs2: 'angular-ui-router',
      //   amd: 'angular-ui-router',
      // },
      // 'angular-translate': {
      //   commonjs: 'angular-translate',
      //   commonjs2: 'angular-translate',
      //   amd: 'angular-translate',
      // },
      // 'angular-ui-bootstrap': {
      //   commonjs: 'angular-ui-bootstrap',
      //   commonjs2: 'angular-ui-bootstrap',
      //   amd: 'angular-ui-bootstrap',
      // },
      // bootstrap: {
      //   commonjs: 'bootstrap',
      //   commonjs2: 'bootstrap',
      //   amd: 'bootstrap',
      // },
      // jquery: {
      //   commonjs: 'jquery',
      //   commonjs2: 'jquery',
      //   amd: 'jquery',
      //   root: 'jQuery',
      // },
      // leaflet: {
      //   commonjs: 'leaflet',
      //   commonjs2: 'leaflet',
      //   amd: 'leaflet',
      //   root: 'L',
      // },
    },
    optimization: {
      noEmitOnErrors: true,
      // runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxSize: (isProduction() ? 1 : 2) * MB,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.p?css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  };
};
