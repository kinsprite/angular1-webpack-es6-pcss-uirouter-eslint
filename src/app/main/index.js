import angular from 'angular';

import htmlTmpl from './main.html';
import MainCtrl from './main.controller';

const moduleName = 'main';

angular.module(moduleName, [])
    .component('main', {
        template: htmlTmpl,
        controller: MainCtrl,
        controllerAs: '$ctrl',
    });

export default moduleName;
