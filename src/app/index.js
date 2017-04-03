import angular from 'angular';

import componentsModule from './components/';
import d3DemoModule from './d3-demo/';
import leafletDemoModule from './leaflet-demo/';
import mainModule from './main/';


const moduleName = 'demo-app';

angular.module(moduleName, [componentsModule, d3DemoModule, leafletDemoModule, mainModule]);

export default moduleName;
