/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const conf = require('./gulp.conf');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    logLevel: 'INFO',
    junitReporter: {
      outputDir: 'test-reports',
    },
    browsers: [
      'ChromeHeadless',
    ],
    frameworks: [
      'mocha',
      'chai',
      'sinon',
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      conf.path.src('index.spec.js'),
      conf.path.src('**/*.html'),
    ],
    preprocessors: {
      [conf.path.src('index.spec.js')]: [
        'webpack',
      ],
      [conf.path.src('**/*.html')]: [
        'ng-html2js',
      ],
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: `${conf.paths.src}/`,
    },
    reporters: ['progress', 'mocha', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
    webpack: conf.buildWebpackConf(conf.webpackEnv.test),
    webpackMiddleware: {
      noInfo: true,
    },
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-webpack'),
    ],
  };

  config.set(configuration);
};
