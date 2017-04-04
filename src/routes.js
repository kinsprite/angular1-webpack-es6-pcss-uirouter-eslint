/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider
        .when('/', '/home')
        .otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            template: '<main></main>',
        })
        .state('app.home', {
            url: 'home',
            template: '<home></home>',
        })
        .state('app.leaflet', {
            url: 'leaflet',
            template: '<leaflet-demo></leaflet-demo>',
        })
        .state('app.d3', {
            url: 'd3',
            template: '<d3-demo></d3-demo>',
        })
    ;
}

export default routesConfig;
