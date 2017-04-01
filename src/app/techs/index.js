import angular from 'angular';
import tech from './tech';
import techs from './techs';

const techsModule = 'techs';

angular
  .module(techsModule, [])
  .component('fountainTech', tech)
  .component('fountainTechs', techs);

export { techsModule as default };
