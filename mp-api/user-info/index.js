import store from "@store";
import { apiGetUserInfo } from '$api';
import { checkRegister } from '$mp-api/register';
import loginTask from "$mp-api/login/task";
import config from '@config';
import utils from 'blue-utils';

//获取用户信息
export function getUserInfo() {
  apiGetUserInfo().then((res) => {
    const { data } = res;
    //设置用户信息
    setUserInfo(data);
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










