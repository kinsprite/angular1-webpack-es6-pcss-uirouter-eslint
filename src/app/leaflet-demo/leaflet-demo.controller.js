
class LeafletDemoCtrl {
    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
        this.initData();
    }

    initData() {
    }

    switchCRS() {
        this.$scope.$broadcast('gis.map.switchCRS');
    }
}

export default LeafletDemoCtrl;
