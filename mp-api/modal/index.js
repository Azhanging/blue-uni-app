import config from '@config';
import utils from 'blue-utils';
import * as mp from '$mp-api/compatible';

const defaultConfig = {
  confirmColor: config.css.baseColor,
  showCancel: false
};

export function modal(opts) {
  const _opts = utils.extend(defaultConfig, opts);
  mp.showModal(_opts);
}

export function modalInVue(Vue) {
  Vue.prototype.$modal = function (opts) {
    modal.call(this, opts);
  };
}
