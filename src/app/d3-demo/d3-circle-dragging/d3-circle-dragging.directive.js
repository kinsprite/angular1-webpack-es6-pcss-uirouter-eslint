/**
 * Created by qxqs1 on 2017/4/3.
 */

// import angular from 'angular';
import * as d3 from 'd3';

function d3CircleDraggingDirective() {
    function link(scope, element /* , attrs */) {
        const container = element[0];

        const canvas = d3.select(container).append('canvas')
            .property('width', scope.width)
            .property('height', scope.height);

        const context = canvas.node().getContext('2d');

        const width = canvas.property('width');
        const height = canvas.property('height');
        const circles = scope.data;
        const { radius } = scope;

        const color = d3.scaleOrdinal()
            .range(d3.schemeCategory20);

        function render() {
            context.clearRect(0, 0, width, height);

            for (let i = 0, n = circles.length, circle; i < n; i += 1) {
                circle = circles[i];
                context.beginPath();
                context.moveTo(circle.x + radius, circle.y);
                context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
                context.fillStyle = color(circle.index);
                context.fill();
                if (circle.active) {
                    context.lineWidth = 2;
                    context.stroke();
                }
            }
        }

        function dragsubject() {
            const n = circles.length;
            let dx;
            let dy;
            let d2;
            let s2 = radius * radius * 4; // Double the radius.
            let circle;
            let subject;

            for (let i = 0; i < n; i += 1) {
                circle = circles[i];
                dx = d3.event.x - circle.x;
                dy = d3.event.y - circle.y;
                d2 = (dx * dx) + (dy * dy);
                if (d2 < s2) {
                    subject = circle;
                    s2 = d2;
                }
            }

            return subject;
        }

        function dragstarted() {
            circles.splice(circles.indexOf(d3.event.subject), 1);
            circles.push(d3.event.subject);
            d3.event.subject.active = true;
        }

        function dragged() {
            d3.event.subject.x = d3.event.x;
            d3.event.subject.y = d3.event.y;
        }

        function dragended() {
            d3.event.subject.active = false;
        }

        render();

        canvas.call(d3.drag()
            .container(canvas.node())
            .subject(dragsubject)
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
            .on('start.render drag.render end.render', render));
    }

    /** @ngInject */
    function control() {

    }
    return {
        restrict: 'E',
        scope: {
            data: '=d3Data',
            radius: '=d3Radius',
            width: '=canvasWidth',
            height: '=canvasHeight',
        },
        link,
        controller: control,
        // controllerAs: '$ctrl',
    };
}

export default d3CircleDraggingDirective;
