/**
 * Created by qxqs1 on 2017/1/28.
 */
export default class ScssTestCtrl {
  /** @ngInject */
  constructor($log) {
    this.subTitle = 'SCSS test controller';
    const arr = [1, 2, 3];
    const isIncluded = arr.indexOf(2) >= 0;
    $log.log(`is array includes: ${isIncluded}`);
  }
}
