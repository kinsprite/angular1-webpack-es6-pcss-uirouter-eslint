/* eslint indent: ["error", 2] */

const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src,
      ],
    },
    open: false,
  };
};
