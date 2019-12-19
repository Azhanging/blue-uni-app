import config from '@config';
import utils from 'blue-utils';
import store from '@store';
import { setUserInfo } from '../user-info';
import { apiLogin } from '$api';
import * as mp from '$mp-api/compatible';
import request from "../request";
import { getCurrentPath } from "../page";
import { redirectRegister } from '../register';

//扩展到Vue中
export function loginInVue(Vue) {
  Vue.prototype.$login = login;
}

//check session
function checkSession() {
  return new Promise(((resolve, reject) => {
    wx.checkSession({
      success() {
        resolve();
      },
      fail() {
        reject();
      }
    });
  }));
}

//检查是否登录了,检查login的配置中在storage中是否存在
export function checkLocalLogin() {
  const keys = Object.keys(config.login.storage);
  let len = 0;
  utils.each(config.login.storage, (key, _key) => {
    if (uni.getStorageSync(_key)) ++len;
  });
  return keys.length === len;
}

//wx login
export function login(opts = {}) {
  return new Promise((resolve) => {
    const { requestOpts } = opts;
    //检查本地的登录状态，只在微信小程序中检查
    if (checkLocalLogin() && (process.env.VUE_APP_PLATFORM === 'mp-weixin')) {
      //检查session
      checkSession().then(() => {
        //检查正常不进行业务处理
        resolve();
      }).catch(() => {
        //清空登录状态
        clearLoginStatus();
        //重新登录
        login(opts).then(() => {
          resolve();
        });
      });
    } else {
      //微信登录
      uni.login({
        //微信的授权timeout
        timeout: 5000,
        //打开就授权支付宝主动授权
        scopes: `auth_user`,
        success(res) {
          mp.hideLoading();
          //login success
          if (/ok/g.test(res.errMsg)) {
            //发送login code
            sendLoginCode({
              params: utils.hook(null, config.login.params, [res]) || {}
            }).then(() => {
              resolve();
              //查看是否存在异常的请求线，有则重新执行request线
              requestOpts && request(requestOpts);
            }).catch(() => {
              //登录失败，提醒重新登录
              showLoginModal().then(() => {
                login(opts);
              });
            });
          } else {
            //登录失败，提醒重新登录
            showLoginModal().then(() => {
              login(opts).then(() => {
                resolve();
              });
            });
          }
        },
        fail() {
          mp.hideLoading();
        }
      });
    }
  });
}

//发送logon code,获取openid
function sendLoginCode(opts = {}) {
  const { params } = opts;
  return apiLogin(params).then((res) => {
    const { data } = res;
    if (res.errcode === 50001) {
      //新用户，前往注册
      redirectRegister({
        path: getCurrentPath()
      });
    } else {
      //新用户，设置用户信息值
      //设置信息到storage中
      setLoginStorage(data);
      //设置用户信息
      setUserInfo(data);
    }
    return res;
  });
}

//设置指定的登录态到
function setLoginStorage(data) {
  const gotData = utils.hook(null, config.login.hooks.got, [data]);
  utils.each(config.login.storage, (key, _key) => {
    if (key in gotData) {
      uni.setStorageSync(_key, gotData[key]);
    }
  });
}


//clear login session in storage
export function clearLoginStatus() {
  //清空所有的存储
  uni.clearStorageSync();
  //重新设置登录状态
  store.commit('SET_LOGIN', false);
}

//提醒重新重新登录
function showLoginModal() {
  return new Promise((resolve) => {
    uni.showModal({
      content: '登录失败',
      showCancel: false,
      confirmText: '重新登录',
      success() {
        resolve();
      }
    });
  });
}