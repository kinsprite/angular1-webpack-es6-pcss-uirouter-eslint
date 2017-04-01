import angular from 'angular';
import 'angular-mocks';
import header from './header';

describe('header component', () => {
  beforeEach(() => {
    angular
      .module('fountainHeader', ['app/header.html'])
      .component('fountainHeader', header);
    angular.mock.module('fountainHeader');
  });

  it('should render \'Fountain Generator\'', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<fountain-header></fountain-header>')($rootScope);
    $rootScope.$digest();
    const headerElem = element.find('a');
    expect(headerElem.html().trim()).toEqual('Fountain Generator');
  }));
});
