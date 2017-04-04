
import L from 'leaflet';

function leafletGisMapDirective() {
    function link(scope, element /*, attrs*/) {
        const container = element[0];

        // create a map in the div, set the view to a given place and zoom
        const map = L.map(container, {
            renderer: L.canvas()
        }).setView([51.505, -0.09], 13);

        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

        // add a marker in the given location, attach some popup content to it and open the popup
        L.marker([51.5, -0.09]).addTo(map);

        L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);

        L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);

        // on Destroy
        scope.$on('$destroy', () => {
            map.remove();
        });
    }

    /** @ngInject */
    function control() {

    }
    return {
        restrict: 'A',
        scope: {
            data: '=',
        },
        link,
        controller: control,
        // controllerAs: '$ctrl',
    };
}

export default leafletGisMapDirective;
