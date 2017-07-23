/* eslint indent: ["error", 2] */

function pkgVersion(name) {
  return require(name + '/package.json').version; // eslint-disable-line
}

module.exports = pkgVersion;
