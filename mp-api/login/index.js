import config from '@config';
import utils from 'blue-utils';
import BlueQueuePipe from 'blue-queue-pipe';
import store from '@store';
import { setUserInfo } from '../user-info';
import { apiLogin } from '$api';
import request from "../request";
import { getCurrentPath } from "../page";
import { redirectRegister } from '../register';
import { showLoading, hideLoading } from '$mp-api/loading';
import { showModal } from '../modal';

//扩展到Vue中
export function loginInVue(Vue) {
  Vue.prototype.$login = login;
  Vue.prototype.$isLogin = isLogin;
}

//登录重连请求队列
const loginRequestQueue = new BlueQueuePipe({
  method: {
    request() {
      while (!this.isEmpty()) {
        const loginRequest = this.dequeue();
        loginRequest
      }
    }
  }
});
//当前的登录进行状态
let loginStatus = false;

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
    showLoading({
      title: '登陆中'
    });
    const { requestOpts } = opts;
    //检查本地的登录状态，只在微信小程序中检查
    if (checkLocalLogin()) {
      hideLoading();
      //检查session
      checkSession().then(() => {
        //检查正常不进行业务处理
        resolve();
      }).catch(() => {
        //重新登录
        login(opts).then((res) => {
          resolve(res);
        });
      });
    } else {
      //如果存在请求链，写入到队列中处理，去掉重复请求链路
      if (requestOpts) {
        loginRequestQueue.enqueue(() => {
          request(requestOpts).then((res) => {
            resolve(res);
          });
        });
      }
      //还在登录状态
      if (loginStatus === true) return;
      //设置登录状态
      loginStatus = true;
      //微信登录
      uni.login({
        //微信的授权timeout
        timeout: 5000,
        //打开就授权支付宝主动授权
        scopes: `auth_user`,
        success(res) {
          hideLoading();
          //login success
          if (!/ok/g.test(res.errMsg)) {
            //登录失败，提醒重新登录
            showLoginModal({
              opts,
              resolve
            });
          }
          //发送login code
          sendLoginCode({
            params: utils.hook(null, config.login.params, [res]) || {}
          }).then(() => {
            //设置登录状态
            loginStatus = false;
            if (requestOpts) {
              //存在登录后处理的request的业务
              loginRequestQueue.useMethod('request');
              request(requestOpts).then((res) => {
                resolve(res);
              });
            } else {
              resolve();
            }
          }).catch(() => {
            //登录失败，提醒重新登录
            showLoginModal({
              opts,
              resolve
            });
          });
        },
        fail() {
          hideLoading();
          //登录失败，提醒重新登录
          showLoginModal({
            opts,
            resolve
          });
        }
      });
    }
  });
}

//检查登录状态
export function isLogin() {
  return new Promise((resolve, reject) => {
    if (store.state.isLogin) {
      resolve();
    } else {
      reject();
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
      //调用成功后的钩子
      utils.hook(null, config.login.hooks.success, [data]);
    }
    return res;
  });
}

//设置指定的登录态到
export function setLoginStorage(data) {
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
  utils.each(config.login.storage, (key, _key) => {
    uni.removeStorageSync(_key);
  });
  //重新设置登录状态
  store.commit('SET_LOGIN', false);
}

//提醒重新重新登录
function showLoginModal({
  resolve,
  opts
}) {
  showModal({
    content: '登录失败',
    showCancel: true,
    confirmText: '重新登录'
  }).then((res) => {
    if (res.confirm === true) {
      //设置登录状态
      loginStatus = false;
      login(opts).then((res) => {
        resolve(res);
      });
    } else if (res.cancel === true) {
      //设置登录状态
      loginStatus = false;
    }
  });
}