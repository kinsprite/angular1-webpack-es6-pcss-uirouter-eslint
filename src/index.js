import angular from 'angular';
import 'angular-ui-router';

import './lib/third-party/Leaflet.MovingMarker/MovingMarker';

import demoAppModule from './app/';
import routesConfig from './routes';

import enUS from './i18n/en-US/';
import zhCN from './i18n/zh-CN/';


angular
    .module('app', [demoAppModule, 'ui.router', 'pascalprecht.translate', 'ngAnimate', 'ngSanitize'])
    .config(routesConfig)
    .config(/** @ngInject */ function ($translateProvider) {
        $translateProvider.translations('en_US', enUS);
        $translateProvider.translations('zh_CN', zhCN);

        $translateProvider.preferredLanguage('zh_CN');
        $translateProvider.useSanitizeValueStrategy('escaped');
    });
