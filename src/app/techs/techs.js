const techsHtml = require('./techs.html');

class TechsController {
  /** @ngInject */
  constructor($http) {
    $http
      .get('app/techs/techs.json')
      .then((response) => {
        this.techs = response.data;
      });
  }
}

const techs = {
  template: techsHtml,
  controller: TechsController,
};

export { techs as default };
