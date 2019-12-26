import utils from 'blue-utils';

//显示不同的弹窗
export function showToast(opts) {
  const { type } = opts;
  return uni.showToast(utils.extend({
    icon: (() => {
      let icon = '';
      if (type === 'success') {
        icon = '';
      } else if (type === 'warn') {
        icon = '';
      } else if (type === 'error') {
        icon = '';
      } else {
        icon = 'none';
      }
      return icon;
    })()
  }, opts));
}

export function toastInVue(Vue){
  Vue.prototype.$showToast = showToast;
}

