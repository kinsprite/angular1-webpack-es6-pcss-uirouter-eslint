/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');

    $urlRouterProvider
        .when('/', '/home')
        .otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            template: '<main></main>',
            component: 'main',
        })
        .state('app.home', {
            url: 'home',
            component: 'home',
            template: '<home></home>',
        })
        .state('app.leaflet', {
            url: 'leaflet',
            component: 'leafletDemo',
        })
        .state('app.d3', {
            url: 'd3',
            component: 'd3Demo',
        })
        .state('app.mockApiNCssModule', {
            url: 'mock-api-n-css-module',
            component: 'mockApiNCssModule',
        });
}

export default routesConfig;
