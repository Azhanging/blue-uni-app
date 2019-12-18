import store from "@store";
import { apiGetUserInfo } from '$api';
import { checkRegister } from '$mp-api/register';
import loginTask from "$mp-api/login/task";
import config from '@config';
import utils from 'blue-utils';
import { checkLocalLogin } from "../login";

//获取用户信息
export function getUserInfo() {
  apiGetUserInfo().then((res) => {
    //设置用户信息
    setUserInfo(res);
  });
}

//设置用户信息
export function setUserInfo(data) {
  //config中userInfo
  const configUserInfo = config.userInfo;
  //设置info信息
  store.commit('SET_USER_INFO', utils.hook(null, configUserInfo.hooks.got, [data]));
  //设置登录状态
  store.commit('SET_LOGIN', true);
  //执行登录后的任务队列
  loginTask.run();
}

//从服务器中获取新的userinfo信息
export function updateUserInfo(userInfo = {}) {
  //config中userInfo
  const configUserInfo = config.userInfo;

  if (!checkLocalLogin()) {
    return console.log('本地未登录，不进行用户更新');
  }

  apiGetUserInfo(utils.hook(null, configUserInfo.params, [userInfo])).then((res) => {
    const { data } = res;
    //设置用户信息
    setUserInfo(data);
    //执行登录后的任务队列
    loginTask.run();
  });
}










