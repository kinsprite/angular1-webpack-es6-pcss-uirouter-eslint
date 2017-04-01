/**
 * Created by qxqs1 on 2017/1/28.
 */

import ScssTestCtrl from './scss-test.controller';

const htmlTpl = require('./scss-test.html');

const scssTestComponent = {
  template: htmlTpl,
  controller: ScssTestCtrl,
};

export { scssTestComponent as default };
