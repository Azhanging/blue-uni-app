import config from '@config';
import utils from 'blue-utils';

const defaultConfig = {
  confirmColor: config.css.baseColor,
  showCancel: false
};

export function showModal(opts) {
  return uni.showModal(utils.extend(defaultConfig, opts)).then(([err, res]) => {
    if (err) return Promise.reject(err);
    return res;
  });
}

export function modalInVue(Vue) {
  Vue.prototype.$showModal = showModal;
}
