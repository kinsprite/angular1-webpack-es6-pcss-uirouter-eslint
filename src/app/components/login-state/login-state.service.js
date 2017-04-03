
class LoginState {
    /** @ngInject */
    constructor ($log) {
        this.$log = $log;
        this.logined = false;
    }

    setLogined(logined) {
        this.logined = logined;
        return this;
    }

    getLogined() {
        return this.logined;
    }
}

export default LoginState;
