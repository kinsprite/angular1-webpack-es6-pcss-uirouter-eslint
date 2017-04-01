/**
 * Created by qxqs1 on 2017/1/29.
 */
import angular from 'angular';
import pcssTest from './pcss-test/';
import scssTest from './scss-test/';

const testHtml = require('./test.html');

const testModule = 'test';
export default testModule;

angular
  .module(testModule, [])
  .component('test', {
    template: testHtml,
  })
  .component('pcssTest', pcssTest)
  .component('scssTest', scssTest)
;
