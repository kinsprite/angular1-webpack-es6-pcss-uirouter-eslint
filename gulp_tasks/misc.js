/* eslint indent: ["error", 2] */

const gulp = require('gulp');
const del = require('del');

const conf = require('../conf/gulp.conf');
const deployPackages = require('../conf/deployment/copy-pkg-files');

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

gulp.task('clean', clean);

function pkgDeployDev() {
  const pkgs = ['jquery', 'bootstrap'];
  const dist = './.tmp/lib/3rd';
  deployPackages(pkgs, dist);
}

gulp.task('pkg:deploy', pkgDeployDev);
