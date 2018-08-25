import angular from 'angular';
import L from 'leaflet';
import '../../lib/third-party/Leaflet.MovingMarker/MovingMarker';

function leafletGisMapDirective() {
    function link(scope, element /* , attrs */) {
        const container = element[0];
        const wuhan = [51.505, -0.09];

        // create a map in the div, set the view to a given place and zoom
        const map = L.map(container, {
            renderer: L.canvas(),
        }).setView(wuhan, 13);

        let isSimpleCRS = false;

        // add an OpenStreetMap tile layer
        const tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

        // add a marker in the given location, attach some popup content to it and open the popup
        const centerPt = {
            EPSG: L.latLng(30.5, 114.09),
            simple: L.latLng(350, 400),
        };

        // map.setView(centerPt.EPSG, 13);

        const posInit = [{
            EPSG: L.latLng(30.505, 114.096),
            simple: L.latLng(300, 350),
        }, {
            EPSG: L.latLng(30.495, 114.084),
            simple: L.latLng(400, 450),
        }];

        const markers = [];

        angular.forEach(posInit, (pos) => {
            const marker = L.Marker.movingMarker([pos.EPSG]).addTo(map);
            marker.pos4CRS = pos;
            markers.push(marker);
        });

        // L.circle([51.508, -0.11], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 500,
        // }).addTo(map);

        // L.polygon([
        //     [51.509, -0.08],
        //     [51.503, -0.06],
        //     [51.51, -0.047],
        // ]).addTo(map);

        const switchCRS = () => {
            isSimpleCRS = !isSimpleCRS;

            if (isSimpleCRS) {
                tile.remove();
            }

            angular.forEach(markers, (marker) => {
                const cpt = map.latLngToContainerPoint(marker.getLatLng());
                marker.pos4CRS.cpt = cpt;
            });

            if (isSimpleCRS) {
                map.options.crs = L.CRS.Simple;
                map.setView(centerPt.simple, 2);
            } else {
                map.options.crs = L.CRS.EPSG3857;
                map.setView(centerPt.EPSG, 13);
                tile.addTo(map);
            }

            angular.forEach(markers, (marker) => {
                const newPos = map.containerPointToLatLng(marker.pos4CRS.cpt);
                marker.setLatLng(newPos);
                marker.moveTo(isSimpleCRS ? marker.pos4CRS.simple : marker.pos4CRS.EPSG, 2000);
            });
        };

        // on Destroy
        scope.$on('$destroy', () => {
            map.remove();
        });

        scope.$on('gis.map.switchCRS', () => {
            switchCRS();
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
