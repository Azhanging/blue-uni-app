import config from '@config';
import store from '@store';
import utils from 'blue-utils';
import { isRegisterPage } from '$mp-api/register';

//获取最后一个地址链接
export function getLastPath() {
  const currentPage = getCurrentPages();
  const lastPath = currentPage[currentPage.length - 1];
  if (lastPath) {
    //获取到参数
    const queryString = utils.stringifyParams(lastPath.options || {});
    //微信的getCurrentPages方法的route地址首位不带/
    return `/${lastPath.route}?${queryString}`;
  }
  return config.path.home;
}

//设置最后一个路由地址
export function setLastPath(path = '') {
  //存在注册前的地址，返回到对应的位置，否则跳回到首页去
  const lastPath = store.state.lastPath;
  if (isRegisterPage(path)) {
    store.commit('setLastPath', lastPath || config.path.home);
  } else {
    store.commit('setLastPath', path);
  }
}

//回到设置的最后一个路由上
export function backLastRoute() {
  uni.navigateTO({
    url: store.state.lastPath
  });
}