import config from '@config';
import store from '@store';
import utils from 'blue-utils';
import { isRegisterPage } from '$mp-api/register';
import { blackListFilter } from '$assets/js/black-list';

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
    const query = utils.stringifyParams(lastPage.options || {});
    //微信的getCurrentPages方法的route地址首位不带/
    return `/${lastPage.route}${query ? `?${query}` : ''}`;
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
  //设置最后的路由，过滤掉地址信息
  store.commit('SET_LAST_PATH', blackListFilter({
    path,
    blackList: config.pages.lastPathBlackList
  }));
}

//回到设置的最后一个路由上
export function backLastRoute(opts = {}) {
  const { type } = opts;
  const url = store.state.lastPath;
  switch (type) {
    case 'launch':
      return uni.reLaunch({
        url
      });
    case 'tab':
      return uni.switchTab({
        url
      });
    case 'nav':
    default :
      uni.navigateTo({
        url
      });
  }
}