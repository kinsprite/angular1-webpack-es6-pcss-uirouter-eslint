import angular from 'angular';

import htmlTmpl from './home.html';

const moduleName = 'home';

angular.module(moduleName, [])
    .component('home', {
        template: htmlTmpl,
    });

export default moduleName;
