import store from '@store';
import utils from 'blue-utils';
import * as mp from '$mp-api/compatible';
import { authorize, authorizeFail } from "../authorize";

//location 接口
export function locationInVue(Vue) {
  Vue.prototype.$getLocation = getLocation;
}

//获取地理位置
function getLocation(opts = {}) {
  return authorize({
    scope: 'scope.userLocation'
  }).then(() => {
    //使用定位,返回可以用于wx.openLocation的经纬度
    return new Promise((resolve, reject) => {
      mp.showLoading();
      //区分不同端的地理位置类型
      const type = (() => {
        switch (process.env.VUE_APP_PLATFORM) {
          case 'mp-weixin':
            return 'gcj02';
          case 'mp-alipay':
            return 1;
        }
      })();
      uni.getLocation(utils.extend({
        type,
        success(res) {
          mp.hideLoading();
          const lat = res.latitude;
          const lgt = res.longitude;
          //设置到本地
          store.commit('setLocation', {
            lat,
            lgt
          });
          resolve({
            lat,
            lgt
          });
        },
        fail(err) {
          mp.hideLoading();
          reject(err);
        }
      }, opts));
    });
  }).catch((err) => {
    mp.hideLoading();
    //针对微信提醒授权使用
    if(/auth/.test(err.errMsg)){
	    authorizeFail({
		    type: 'location'
	    });
    }
    return Promise.reject(err);
  });
}
