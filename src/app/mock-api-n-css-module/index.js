
import angular from 'angular';

import MackAppCtrl from './mock-api-n-css-module.controller';
import htmlTmpl from './mock-api-n-css-module.html';
import css from './mock-api-n-css-module.pcss';

const moduleName = 'mock-api-n-css-module';

angular.module(moduleName, [])
    .component('mockApiNCssModule', {
        template: htmlTmpl,
        controller: MackAppCtrl,
        controllerAs: '$ctrl',
    })
;

export default moduleName;
