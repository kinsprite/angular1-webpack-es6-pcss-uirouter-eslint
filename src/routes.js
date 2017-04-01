

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider
    .when('/', '/test')
    .otherwise('/');

  $stateProvider
    .state('app', {
      url: '/app',
      component: 'app',
    })
    .state('test', {
      url: '/test',
      component: 'test',
    })
    .state('test.pcss', {
      url: '/pcss',
      component: 'pcssTest',
    })
    .state('test.scss', {
      url: '/scss',
      component: 'scssTest',
    })
  ;
}

export default routesConfig;
