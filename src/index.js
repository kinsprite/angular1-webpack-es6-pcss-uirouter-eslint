import angular from 'angular';
import 'angular-ui-router';
// import jq from 'jquery';

import techsModule from './app/techs/index';
import routesConfig from './routes';
import main from './app/main';
import header from './app/header';
import title from './app/title';
import footer from './app/footer';
import testModule from './app/test';

import './index.css';

// angular.extend(window, { jQuery: jq, $: jq });  // eslint-disable-line angular/window-service

// window['jQuery'] = require('jquery');
// window['$'] = require('jquery');  // eslint-disable-line angular/window-service

angular
  .module('app', [techsModule, testModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainTitle', title)
  .component('fountainFooter', footer);
