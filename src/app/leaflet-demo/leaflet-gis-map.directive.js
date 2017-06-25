
import L from 'leaflet';

function leafletGisMapDirective() {
    function link(scope, element /* , attrs */) {
        const container = element[0];

        // create a map in the div, set the view to a given place and zoom
        const map = L.map(container, {
            renderer: L.canvas(),
        }).setView([51.505, -0.09], 13);

        let isSimpleCRS = false;

        // add an OpenStreetMap tile layer
        const tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

        // add a marker in the given location, attach some popup content to it and open the popup
        const pos = {
            EPSG: L.latLng(51.5, -0.09),
            EPSGCenter: L.latLng(51.5, -0.09),
            simple: L.latLng(300, 400),
            simpleCenter: L.latLng(350, 400),
        };

        const marker = L.Marker.movingMarker([pos.EPSG]).addTo(map);

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

        const switchToSimple = () => {
            tile.remove();
            marker.remove();
            const cpt = map.latLngToContainerPoint(marker.getLatLng());
            map.options.crs = L.CRS.Simple;
            map.setView(pos.simpleCenter).setZoom(2);

            const newPos = map.containerPointToLatLng(cpt);
            marker.setLatLng(newPos);
            marker.addTo(map);

            marker.moveTo(pos.simple, 2000);
        };

        const switchToEPSG = () => {
            marker.remove();
            const cpt = map.latLngToContainerPoint(marker.getLatLng());
            map.options.crs = L.CRS.EPSG3857;
            tile.addTo(map);

            map.setView(pos.EPSGCenter).setZoom(13);
            const newPos = map.containerPointToLatLng(cpt);
            marker.setLatLng(newPos);
            marker.addTo(map);

            marker.moveTo(pos.EPSG, 2000);
        };

        // on Destroy
        scope.$on('$destroy', () => {
            map.remove();
        });

        scope.$on('gis.map.switchCRS', () => {
            if (isSimpleCRS) {
                switchToEPSG();
                isSimpleCRS = false;
            } else {
                switchToSimple();
                isSimpleCRS = true;
            }
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
