/**
 * Created by qxqs1 on 2017/4/3.
 */

import * as d3 from 'd3';

class D3DemoCtrl {
    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
        this.initData();
    }

    initData() {
        this.width = 1360;
        this.height = 680;
        this.radius = 32;

        this.data = d3.range(20).map((i) => {
            return {
                index: i,
                x: Math.round(Math.random() * (this.width - this.radius * 2) + this.radius),
                y: Math.round(Math.random() * (this.height - this.radius * 2) + this.radius)
            };
        });
    }
}

export default D3DemoCtrl;
