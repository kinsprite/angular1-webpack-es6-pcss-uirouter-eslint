
import angular from 'angular';

import d3CircleDraggingDirective from './d3-circle-dragging/d3-circle-dragging.directive';

import htmlTmpl from './d3-demo.html';
import D3DemoCtrl from './d3-demo.controller';

const moduleName = 'd3-demo';

angular.module(moduleName, [])
    .directive('d3CircleDragging', d3CircleDraggingDirective)
    .component('d3Demo', {
        template: htmlTmpl,
        controller: D3DemoCtrl,
        controllerAs: '$ctrl',
    });

export default moduleName;
