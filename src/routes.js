

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider
    // .when('/', '/app')
    .otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'main',
    })
    .state('app.leaflet', {
      url: 'leaflet',
      component: 'leafletDemo',
    })
    .state('app.d3', {
      url: 'd3',
      component: 'd3Demo',
    })
  ;
}

export default routesConfig;
