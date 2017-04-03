import angular from 'angular';

import loginStateService from './login-state/login-state.service';


const moduleName = 'demoComponents';
angular.module(moduleName, [])
    .service('loginState', loginStateService);

export default moduleName;
