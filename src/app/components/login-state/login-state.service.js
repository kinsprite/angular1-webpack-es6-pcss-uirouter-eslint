
class LoginState {
    /** @ngInject */
    constructor($log) {
        this.$log = $log;
        this.logined = false;
    }

    /**
     *
     *
     * @param {any} logined
     * @returns
     * @memberof LoginState
     */
    setLogined(logined) {
        this.logined = logined;
        return this;
    }

    getLogined() {
        return this.logined;
    }

    static myV = 10;
}

export default LoginState;
