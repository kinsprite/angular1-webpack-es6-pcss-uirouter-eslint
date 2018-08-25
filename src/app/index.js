
import angular from 'angular';

import componentsModule from './components';
import mainModule from './main';
import homeModule from './home';

import d3DemoModule from './d3-demo';
import leafletDemoModule from './leaflet-demo';

import mockApiCssModule from './mock-api-n-css-module';

const moduleName = 'demo-app';

angular.module(moduleName, [
    componentsModule,
    mainModule,
    homeModule,
    d3DemoModule,
    leafletDemoModule,
    mockApiCssModule,
]);

export default moduleName;
