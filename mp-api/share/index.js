import config from '@config';
import utils from 'blue-utils';
import { getCurrentPath } from '$mp-api/page';

//查询分享黑名单
function shareBlackListFilter(path) {
  const homePath = config.path.home;
  //配置的黑名单
  const blackList = config.share.blackList;
  for (let i = 0; i < blackList.length; i++) {
    const item = blackList[i];
    //匹配字符串类型
    if (typeof item.path === 'string' && item.path === path) {
      return item.sharePath || homePath;
    } else if (item.path instanceof RegExp && item.path.test(path)) {
      //通过正则匹配
      return item.sharePath || homePath;
    }
  }
  //没有查询到返回默认的地址
  return path;
}


export function shareInVue(Vue) {
  //分享地址生成
  Vue.prototype.$sharePath = sharePath;

  //默认的分享，有需要的在自己的实例中使用onShareAppMessage
  Vue.mixin({
    onShareAppMessage() {
      return {
        title: config.share.title,
        imageUrl: config.share.imgUrl,
        //分享走最后的path
        path: sharePath()
      };
    }
  });
}

//分享地址
export function sharePath(path) {
  //小程序路由地址
  const currentPath = path || getCurrentPath();
  //没参数地址
  const _path = utils.getNoParamsLink(currentPath);
  //object params
  const objQuery = utils.parseParams(utils.getLinkParams(currentPath));
  //带入忽略参数地址
  const sharePath = shareBlackListFilter(_path);
  //返回链接
  return `${sharePath}?${encodeURIComponent(utils.stringifyParams(objQuery))}`;
}



