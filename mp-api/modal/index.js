import config from '@config';
import utils from 'blue-utils';

const defaultConfig = {
  confirmColor: config.css.baseColor,
  showCancel: false
};

export function modal(opts) {
  uni.showModal(utils.extend(defaultConfig, opts));
}

export function modalInVue(Vue) {
  Vue.prototype.$modal = function (opts) {
    modal.call(this, opts);
  };
}
