/**
 * Created by qxqs1 on 2017/1/28.
 */
import './pcss-test.pcss';
import PcssTestCtrl from './pcss-test.controller';

const htmlTpl = require('./pcss-test.html');

const pcssTestComponent = {
  template: htmlTpl,
  controller: PcssTestCtrl,
};

export { pcssTestComponent as default };
