import config from '@config';
import utils from 'blue-utils';
import store from '@store';
import { updateUserInfo } from '../user-info';
import { apiLogin } from '$api';
import * as mp from '$mp-api/compatible';
import request from "../request";

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
function checkLocalLogin() {
  const keys = Object.keys(config.login.storage);
  let len = 0;
  utils.each(config.login.storage, (key, _key) => {
    if (mp.getStorageSync(_key)) ++len;
  });
  return keys.length === len;
}

//wx login
export function login(opts = {}) {
  return new Promise(((resolve) => {
    const { requestOpts } = opts;
    //检查登录状态，只在微信小程序中检查
    if (checkLocalLogin() && (process.env.VUE_APP_PLATFORM === 'mp-weixin')) {
      //检查session
      checkSession().then(() => {
        //更新用户信息
        updateUserInfo();
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
      //weixin login
      mp.login({
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
              //查看是否存在异常的请求线，有则重新执行request线
              requestOpts && request(requestOpts);
            }).catch(() => {
              //尝试登录
              showLoginModal().then(() => {
                login(opts);
              });
            });
          } else {
            showLoginModal().then(() => {
              login(opts);
            });
          }
        },
        fail() {
          mp.hideLoading();
        }
      });
    }
  }));
}

//发送logon code,获取openid
function sendLoginCode(opts = {}) {
  return new Promise(((resolve, reject) => {
    const { params } = opts;
    apiLogin(params).then((res) => {
      const { data } = res;
      //设置信息到storage中
      setLoginStorage(data);
      //更新用户信息
      updateUserInfo();
      resolve();
    }).catch(() => {
      reject();
    });
  }));
}

//设置指定的登录态到
function setLoginStorage(data) {
  const gotData = utils.hook(null, config.login.hooks.got, [data]);
  utils.each(config.login.storage, (key, _key) => {
    if (key in gotData) {
      mp.setStorageSync(_key, gotData[key]);
    }
  });
}


//clear login session in storage
export function clearLoginStatus() {
  //清空所有的存储
  uni.clearStorageSync();
  //重新设置登录状态
  store.commit('setLogin', false);
}

//提醒重新重新登录
function showLoginModal() {
  return new Promise((resolve) => {
    mp.showModal({
      content: '登录失败',
      showCancel: false,
      confirmText: '重新登录',
      success() {
        resolve();
      }
    });
  });
}