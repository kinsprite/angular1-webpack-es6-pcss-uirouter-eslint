/* eslint indent: ["error", 2] */

const conf = require('./gulp.conf');
const mockApi = require('./mock-api.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist,
      ],
    },
    open: false,
    middleware: [mockApi],
  };
};
