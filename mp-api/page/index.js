import config from '@config';
import store from '@store';
import utils from 'blue-utils';
import { isRegisterPage } from '$mp-api/register';

//页面参数
export let query = {};

//设置参数
export function setQuery(pageQuery) {
  query = pageQuery || {};
}

//获取最后一个地址链接
export function getCurrentPath() {
  const lastPage = getCurrentPage();
  if (lastPage) {
    //获取到参数
    const queryString = utils.stringifyParams(lastPage.options || {});
    //微信的getCurrentPages方法的route地址首位不带/
    return `/${lastPage.route}${queryString ? `?${queryString}` : ''}`;
  }
  return config.path.home;
}

//获取当前的page实例
export function getCurrentPage() {
  const currentPage = getCurrentPages();
  return currentPage[currentPage.length - 1];
}

//设置最后一个路由地址
export function setLastPath(path = '') {
  //存在注册前的地址，返回到对应的位置，否则跳回到首页去
  const lastPath = store.state.lastPath;
  if (isRegisterPage(path)) {
    store.commit('SET_LAST_PATH', lastPath || config.path.home);
  } else {
    store.commit('SET_LAST_PATH', path);
  }
}

//回到设置的最后一个路由上
export function backLastRoute() {
  uni.navigateTo({
    url: store.state.lastPath
  });
}

//回到设置的最后一个路由上
export function reLaunchLastRoute() {
  uni.reLaunch({
    url: store.state.lastPath
  });
}