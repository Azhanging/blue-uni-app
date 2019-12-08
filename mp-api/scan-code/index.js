import utils from 'blue-utils';
import * as mp from '$mp-api/compatible';

//扫二维码
function scanCode(opts = {}) {
  return new Promise((resolve, reject) => {
    mp.scanCode(utils.extend({
      success: (res) => {
        //统一微信||支付宝区分扫描到data中
        res.data = res.result || res.code || ``;
        resolve(res);
      },
      fail: (err) => {
        //取消，失败
        console.log(err);
        reject(err);
      }
    }, opts));
  });
}

//在vue扩展
export function scanCodeInVue(Vue) {
  Vue.prototype.$scanCode = scanCode;
}