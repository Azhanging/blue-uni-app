import { aipGetPhone } from '$api';
import config from '@config';
import store from '@store';
import { updateUserInfo } from "../user-info";
import { getLastPath } from "$mp-api/page";
import * as mp from '$mp-api/compatible';

//get phone in vue
export function phoneInVue(Vue) {
  //获取手机号
  Vue.prototype.$getPhone = getPhone;
  Vue.prototype.$bindPhone = bindPhone;
}

//获取手机号加密信息，更新本地的userinfo信息，里面会带上phone的信息
export function getPhone(res) {
  const target = res.target;
  if (/ok/g.test(target.errMsg)) {
    return aipGetPhone({
      encryptedData: target.encryptedData,
      iv: target.iv,
      appid: config.app.id,
      session_key: mp.getStorageSync(config.bind.phone.sessionKeyName),
    });
  }
  //用取消走reject
  return Promise.reject(target);
}

//绑定手机号更新到用户信息
export function bindPhone(res) {
  //api解密的phone处理后绑定手机号到当前用户
  return getPhone(res).then((res) => {
    const { data } = res;
    const { purePhoneNumber } = data;
    const userInfo = store.state.userInfo;
    userInfo.phone = purePhoneNumber;
    //获取完手机更新用户信息
    updateUserInfo(userInfo);
  });
}

