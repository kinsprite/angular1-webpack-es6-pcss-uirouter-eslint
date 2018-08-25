/**
 * Created by qxqs1 on 2017/2/14.
 */

/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const sourceMappingURL = require('source-map-url');
const assign = require('object-assign');

function HtmlWebpackInlineManifestJsonPlugin(options) {
  this.options = assign({
    filename: 'chunk-manifest.json',
    manifestJsonVariable: 'webpackManifestJson',
  }, options);
}

HtmlWebpackInlineManifestJsonPlugin.prototype.apply = function pluginApply(compiler) {
  const self = this;

  const onCompilation = (compilation) => {
    const onBeforeHtmlGeneration = (htmlPluginData, callback) => {
      const { filename } = self.options;

      const webpackManifestJson = [];
      const htmlPlugnAssets = htmlPluginData.assets;
      const compilationAssets = compilation.assets;

      const manifest = compilationAssets[filename];

      if (manifest) {
        webpackManifestJson.push(sourceMappingURL.removeFrom(manifest.source()));
        delete compilationAssets[filename];
      }

      htmlPlugnAssets[self.options.manifestJsonVariable] = webpackManifestJson.join(',') || '{}';

      if (callback) {
        callback(null, htmlPluginData);
        return undefined;
      }

      return Promise.resolve(htmlPluginData);
    };

    // Webpack 4+
    if (compilation.hooks) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('htmlWebpackInlineManifestJsonPlugin', onBeforeHtmlGeneration);
    } else {
      // Webpack 3
      compilation.plugin('html-webpack-plugin-before-html-generation', onBeforeHtmlGeneration);
    }
  };

  // Webpack 4+
  if (compiler.hooks) {
    compiler.hooks.compilation.tap('htmlWebpackInlineManifestJsonPlugin', onCompilation);
  } else {
    // Webpack 3
    compiler.plugin('compilation', onCompilation);
  }

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {

    });
  });
};

module.exports = HtmlWebpackInlineManifestJsonPlugin;
