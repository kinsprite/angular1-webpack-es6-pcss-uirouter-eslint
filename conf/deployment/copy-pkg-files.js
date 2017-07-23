/* eslint indent: ["error", 2] */

const gulp = require('gulp');
const filter = require('gulp-filter');
const path = require('path');

const pkgVersion = require('./pkg-version');

const pkgDeployMap = {
  'babel-polyfill': {
    src: 'dist/*.js', // node-glob
    dest: '',
  },
  jquery: {
    src: 'dist/*.js', // node-glob
    dest: '',
  },
  bootstrap: [
    {
      src: ['dist/**/*'], // node-glob
      dest: '',
    },
  ],
  angular: {
    src: 'angular.*',
    dest: '',
  },
  d3: {
    src: 'build/d3.*',
    dest: '',
  },
};

function resolveSrc(pkg, originalSrc) {
  if (Array.isArray(originalSrc)) {
    return originalSrc.map(src => `node_modules/${pkg}/${src}`);
  }

  return `node_modules/${pkg}/${originalSrc}`;
}


/**
 * @param {string} pkg
 * @param {object} depMap
 * @returns
 */
function deployOne(pkg, depMap, dist) {
  const fileFilter = filter(file => file.stat.isFile());
  const outDest = path.join(dist, pkg, pkgVersion(pkg), depMap.dest);

  gulp.src(resolveSrc(pkg, depMap.src))
    .pipe(fileFilter)
    .pipe(gulp.dest(outDest));
}

/**
 * @param {string[]} pkgs
 * @returns
 */
function deployPackages(pkgs, dist) {
  // const pkgs = ['jquery', 'bootstrap'];
  const depMap = pkgDeployMap;
  // const dist = './.tmp';

  pkgs.forEach(function (pkg) {
    const pkgDep = depMap[pkg];

    if (!pkgDep) {
      return;
    }

    if (Array.isArray(pkgDep)) {
      pkgDep.forEach(function (d) {
        deployOne(pkg, d, dist);
      });
    } else {
      deployOne(pkg, pkgDep, dist);
    }
  });

  return 0;
}

module.exports = deployPackages;
