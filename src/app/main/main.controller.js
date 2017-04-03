
class MainCtrl {
    /** @ngInject */
    constructor($scope, loginState) {
        this.$scope = $scope;
        this.loginState = loginState;
    }

    onClickLogin() {
        this.loginState.setLogined(!this.loginState.getLogined());
    }

    isLogined() {
        return this.loginState.getLogined();
    }
}

export default MainCtrl;
