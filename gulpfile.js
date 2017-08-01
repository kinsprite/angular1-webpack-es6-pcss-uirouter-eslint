/* eslint indent: ["error", 2] */

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');
const shell = require('gulp-shell');
const path = require('path');
const stylelint = require('stylelint');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  done();
}

function stylelintRun() {
  return stylelint.lint({
    files: ['**/*.?(p|s)css'],
    syntax: 'scss',
    formatter: 'string',
  }).then((res) => {
    console.log(res.output); // eslint-disable-line
  });
}

gulp.task('build', gulp.series('webpack:dist'));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

gulp.task('dostylelint', stylelintRun);

const eslintPath = path.join('.', 'node_modules', '.bin', 'eslint');
const htmlhintPath = path.join('.', 'node_modules', '.bin', 'htmlhint');

gulp.task('eslint', shell.task(`${eslintPath} -o .out.eslint.html -f html .`));
gulp.task('stylelint', shell.task('gulp dostylelint > .out.stylelint.txt'));
gulp.task('htmlhint', shell.task(`${htmlhintPath} **/*.{htm,html}`));
