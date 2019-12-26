import config from '@config';
import utils from 'blue-utils';

const defaultConfig = {
  confirmColor: config.css.baseColor,
  showCancel: false
};

export function showModal(opts) {
  uni.showModal(utils.extend(defaultConfig, opts));
}

export function modalInVue(Vue) {
  Vue.prototype.$showModal = function (opts) {
    showModal.call(this, opts);
  };
}
