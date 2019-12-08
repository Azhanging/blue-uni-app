import { apiPay } from '$api';
import utils from 'blue-utils';
import * as mp from '$mp-api/compatible';

//扩展支付 in Vue
export function mpPayInVue(Vue) {
  Vue.prototype.$pay = function (opts = {}) {
    apiPay().then((res) => {
      const { data } = res;
      pay.apply(this, [data, opts]);
    });
  };
}

//支付API
export function pay(res, opts) {
  const {
    timeStamp = "",
    nonceStr = "",
    pay_package = "",
    signType = "MD5",
    paySign = ""
  } = res;

  mp.pay({
    timeStamp,
    nonceStr,
    'package': pay_package,
    signType,
    paySign,
    success: (res) => {
      const { errMsg } = res;
      //支付成功
      if (/ok/g.test(errMsg)) {
        utils.hook(this, opts.success, [{ res }]);
      } else if (/fail cancel/g.test(errMsg)) {
        //用户取消
        utils.hook(this, opts.cancel, [{ res }]);
      } else if (/fail \(detail message\)/.test(errMsg)) {
        //支付失败
        utils.hook(this, opts.error, [{ res }]);
      }
    },
    fail: () => {
      mp.showToast({
        icon: 'none',
        title: "支付发生错误"
      });
      utils.hook(this, opts.fail, [{ res }]);
    }
  });
}
