import angular from 'angular';
import 'angular-mocks';

import { expect, assert } from 'chai';

import footer from './footer';

describe('footer component', () => {
    beforeEach(() => {
        angular
            .module('fountainFooter', [])
            .component('fountainFooter', footer);
        angular.mock.module('fountainFooter');
    });

    it('should render \'FountainJS team\'', angular.mock.inject(($rootScope, $compile) => {
        const element = $compile('<fountain-footer></fountain-footer>')($rootScope);
        $rootScope.$digest();
        const footerElem = element.find('a');
        expect(footerElem.html().trim()).to.be.equal('FountainJS team');
    }));
});
