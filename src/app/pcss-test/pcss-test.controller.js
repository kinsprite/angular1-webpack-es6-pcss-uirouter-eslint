/**
 * Created by qxqs1 on 2017/1/28.
 */

import angular from 'angular';
// import L from '../../libs/leaflet.wrapper';

export default class PcssTestCtrl {
  /** @ngInject */
  constructor($scope) {
    this.subTitle = 'PCSS test controller';
    this.$scope = $scope;
    this.definedLayers = {
      openStreetMap: {
        name: 'OpenStreetMap',
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        type: 'xyz',
      },
      // mapbox_light: {
      //   name: 'Mapbox Light',
      //   type: 'mapbox',
      //   user: 'elesdoar',
      //   key: 'citojtj9e00022iqjmdzhrdwd',
      //   apiKey: 'pk.eyJ1IjoiZWxlc2RvYXIiLCJhIjoiY2l0bmcwaDNpMDQzMTJvbDRpaTltN2dlbiJ9.KDnhRVh9St6vpQovMI7iLg',
      // },
      tianDiTuNormalMap: {
        name: 'TianDiTu Normal Map',
        type: 'china',
        layerOptions: {
          type: 'TianDiTu.Normal.Map',
        },
      },
      gaoDeNormal: {
        name: 'GaoDe Normal',
        type: 'china',
        layerOptions: {
          type: 'GaoDe.Normal.Map',
        },
      },
      // mapABC: {
      //   name: 'MapABC Normal',
      //   type: 'china',
      //   layerOptions: {
      //     type: 'MapABC.Normal.Map',
      //   },
      // },
      googleCN: {
        name: 'GoogleCN Normal',
        type: 'china',
        layerOptions: {
          type: 'GoogleCN.Normal.Map',
        },
      },
    };

    this.definedOverlays = {
      // hillshade: {
      //   name: 'Hillshade Europa',
      //   type: 'wms',
      //   url: 'http://129.206.228.72/cached/hillshade',
      //   visible: true,
      //   layerOptions: {
      //     layers: 'europe_wms:hs_srtm_europa',
      //     format: 'image/png',
      //     opacity: 0.25,
      //     attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
      //     crs: L.CRS.EPSG900913,
      //   },
      // },
      tianDiTuNormalMap: {
        name: 'TianDiTu Normal Annotion',
        type: 'china',
        layerOptions: {
          type: 'TianDiTu.Normal.Annotion',
        },
      },
      gaoDeSatelliteMap: {
        name: 'GaoDe Satellite Map',
        type: 'china',
        layerOptions: {
          type: 'GaoDe.Satellite.Map',
        },
      },
      gaoDeSatelliteAnnotion: {
        name: 'GaoDe Satellite Annotion',
        type: 'china',
        layerOptions: {
          type: 'GaoDe.Satellite.Annotion',
        },
      },
    };

    this.cities = {
      wuhan: {
        lat: 30.22,
        lng: 113.56,
        zoom: 6,
      },
      bern: {
        lat: 46.916,
        lng: 7.466,
        zoom: 10,
      },
    };

    angular.extend(this, {
      center: this.cities.wuhan,
      layers: {
        baselayers: this.definedLayers,
        overlays: this.definedOverlays,
      },
    });
  }

  toggleLayer(layerName) {
    const baselayers = this.layers.baselayers;
    if (Object.prototype.hasOwnProperty.call(baselayers, layerName)) {
      delete baselayers[layerName];
    } else {
      baselayers[layerName] = this.definedLayers[layerName];
    }

    a = 23;
  }

  toggleOverlay(overlayName) {
    const overlays = this.layers.overlays;
    if (Object.prototype.hasOwnProperty.call(overlays, overlayName)) {
      delete overlays[overlayName];
    } else {
      overlays[overlayName] = this.definedOverlays[overlayName];
    }
  }
}
