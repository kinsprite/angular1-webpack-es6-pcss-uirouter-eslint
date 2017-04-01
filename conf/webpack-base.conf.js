const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const assign = require('object-assign');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineManifestJsonWebpackPlugin = require('./inline-manifest-json.webpack.plugins.js');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

// const pkg = require('../package.json');
const stylelintOptions = require('./stylelint-options.conf');
const cssLoaders = require('./css-loaders.conf');

const urlLoaderLimit = 2000; // 内嵌 font/svg/png 大小限制

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
          exclude: /node_modules/,
          use: [
            'jshint-loader',
          ],
          enforce: 'pre',
        },
        {
          test: /\.html?$/,
          exclude: /node_modules/,
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
          exclude: /\.tmp.\.sprites/,
          use: [{
            loader: 'file-loader',
            options: {
              // use HASH file name for 'production
              name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
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
              name: isProduction() ? 'sprite-[hash].[ext]' : '[path][name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
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
            name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'fonts/',
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
            name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/',
          },
        },
        {
          // Sprites SVG
          test: /\.tmp.\.sprites.+\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? 'sprite-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/',
          },
        },
        {
          // 字体 SVG
          test: /glyphicons.*\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'fonts/',
          },
        },
        {
          test: /\.p?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoaders.pcss(isProduction()),
          }),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'ng-annotate-loader',
            'babel-loader',
          ],
        },
        {
          test: /\.html$/,
          use: [
            'html-loader',
          ],
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
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
          minify: isProduction() ?
            { collapseBooleanAttributes: true, collapseWhitespace: true, removeComments: true } :
            false,
          template: conf.path.src('index.ejs'),
        }),
        new ExtractTextPlugin({
          // CSS chunk 不可以导出到 output.path 的其它位置, 否则, 找不到 css url() 中的图片位置
          filename: isProduction() ? '[name]-[contenthash].css' : '[name].css',
          disable: false,
        }),
        new ChunkManifestPlugin({
          filename: 'chunk-manifest.json',
          manifestVariable: 'webpackManifest',
        }),
        new InlineManifestJsonWebpackPlugin({
          filename: 'chunk-manifest.json',
          manifestJsonVariable: 'webpackManifestJson',
        }),
        new DuplicatePackageCheckerPlugin(),
        new webpack.LoaderOptionsPlugin({
          debug: !isProduction(),
        }),
        new StylelintWebpackPlugin(
          assign({
            files: ['**/*.?(p|s)css'],
          }, stylelintOptions.scss)),
        new webpack.ProvidePlugin({
          //***
          //*** Webpack碰到全局变量 $ 时, 查找到指定的模块 'jquery'
          //***
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery', // for Angular 1.x
        }),
      ];

      // Test 时，不可使用 CommonsChunkPlugin, 否则找不到 webpackJsonp
      if (!isTestArg) {
        plugins.push(
          new webpack.optimize.CommonsChunkPlugin({
            // 必需 reverse() 才能确 HTML template 中加载 script 次序正确
            name: [
              // 公共 chunk ，不应添加 app entries
              'manifest', 'vendor-base', 'vendor-angular', 'vendor-ui-router', 'vendor-ng-ui',
              'vendor-leaflet',
            ].reverse(),
            // js chunk 可以导出到 output.path 的其它位置, 但造成 require.ensure 加载时找不到文件。
            filename: isProduction() ? '[name]-[chunkhash].js' : '[name].js',
            minChunks: Infinity,
          }));
      }

      return plugins;
    }(isTest())),
    resolve: {
      alias: {
        //***
        //*** Webpack 查找模块/文件时，使用 alias 去替换文件路径.
        //***
        jquery: 'jquery/dist/jquery.js',
        // 'bootstrap': 'bootstrap/dist/js/bootstrap.js',
        'bootstrap.css': 'bootstrap/dist/css/bootstrap.css', // 点号(.)相对于 gulp 执行目录
        'leaflet.css': 'leaflet/dist/leaflet.css',
        modernizr$: path.resolve(__dirname, '.modernizrrc.js'),
      },
      extensions: ['.js'],
    },
    entry: {
      //***
      //*** 在目标 HTML 中以几个模块加载(js/css)
      //***
      app: `./${conf.path.src('index')}`,
      // 'vendor': Object.keys(pkg.dependencies),
      'vendor-base': ['jquery', 'bootstrap', 'bootstrap.css', 'animate.css'],
      'vendor-angular': ['angular'],
      'vendor-ui-router': ['angular-ui-router'],
      'vendor-ng-ui': ['angular-ui-bootstrap'],
      'vendor-leaflet': ['leaflet', 'leaflet.css'],
    },
  };
};
