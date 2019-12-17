import store from "@store";
import { apiUpdateUserInfo } from '$api';
import { authorizeFail } from "../authorize";
import { checkRegister } from '$mp-api/register';
import loginTask from "$mp-api/login/task";
import * as mp from '$mp-api/compatible';
import config from '@config';
import utils from 'blue-utils';
import { checkLocalLogin } from "../login";

//扩展 userInfo in Vue
export function userInfoInVue(Vue) {

  //获取user info
  Vue.prototype.$getUserInfo = getUserInfo;

  //授权使用
  Vue.prototype.$authorizeUserInfo = function (e) {
    authorizeUserInfo.call(this, e);
  };

}

//授权用户
function authorizeUserInfo(e) {
  //authorize success
  if (/ok/g.test(e.target.errMsg)) {
    //更新用户userInfo
    updateUserInfo(e.target.userInfo);
  } else if (/fail/g.test(e.target.errMsg)) {
    //authorize error
    authorizeFail({
      type: 'userInfo'
    });
  }
}

//获取用户信息
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    mp.getUserInfo({
      success(res) {
        updateUserInfo(res.userInfo);
        resolve(res);
      },
      fail(err) {
        authorizeFail({
          type: 'userInfo'
        });
        reject(err);
      }
    });
  });
}

//从服务器中获取新的userinfo信息
export function updateUserInfo(userInfo = {}) {
  //config中userInfo
  const configUserInfo = config.userInfo;

  if (!checkLocalLogin()) {
    return console.log('本地未登录，不进行用户更新');
  }

  apiUpdateUserInfo(utils.hook(null, configUserInfo.params, [userInfo])).then((res) => {
    const { data } = res;
    //走一遍got的钩子
    const gotData = utils.hook(null, configUserInfo.hooks.got, [data]);
    //设置info信息
    store.commit('setUserInfo', gotData);
    //设置登录状态
    store.commit('setLogin', true);
    //执行登录后的任务队列
    loginTask.run();
  });
}










