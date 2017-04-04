
import angular from 'angular';

import leafletGisMapDirective from './leaflet-gis-map.directive';
import htmlTmpl from './leaflet-demo.html';
import LeafletDemoCtrl from './leaflet-demo.controller';

const moduleName = 'leaflet-demo';

angular.module(moduleName, [])
    .directive('leafletGisMap', leafletGisMapDirective)
    .component('leafletDemo', {
        template: htmlTmpl,
        controller: LeafletDemoCtrl,
        controllerAs: '$ctrl',
    })
;

export default moduleName;
