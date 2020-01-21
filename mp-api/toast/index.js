import utils from 'blue-utils';

//默认的toast属性
const defaultToastOpts = {
  mask: true
};

//显示不同的弹窗
export function showToast(opts) {
  const { type } = opts;
  return uni.showToast(utils.extend({
    icon: (() => {
      let icon = '';
      switch (type) {
        case 'success':
          icon = ``;
          break;
        case 'warn':
          icon = ``;
          break;
        case 'error':
          icon = ``;
          break;
        default :
          icon = 'none';
      }
      return icon;
    })()
  }, defaultToastOpts, opts));
}

export function toastInVue(Vue) {
  Vue.prototype.$showToast = showToast;
}

