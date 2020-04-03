import utils from 'blue-utils';
import config from '@config';
import { showLoading, hideLoading } from '$mp-api/loading';
import { showToast } from '$mp-api/toast';
import { pageID } from '$mp-api/page';
//拦截处理
import { responseInterceptor } from './interceptor';

//在vue扩展
export function requestInVue(Vue) {
  //扩展 wx.request,带上登录态处理
  Vue.prototype.$request = request;
}

//设置扩展
function setExtend(opts) {
  //原始的url
  opts.rawUrl = opts.url;
  //合并域名
  opts.url = `${opts.baseUrl || config.url.base || ''}${opts.url}`;

  return utils.extend(config.request.options, {
    header: setRequestHeader(),
  }, opts);
}

//设置login header
function setRequestHeader() {
  const header = {};
  utils.each(config.login.storage, (key, _key) => {
    header[_key] = uni.getStorageSync(_key);
  });
  return header;
}

//request 请求封装
export default function request(requestOpts) {
  //获取到添加login header options
  requestOpts = setExtend(requestOpts);
  //请求中的自定义提醒
  const requestOptsTips = requestOpts.tips;
  //request loading的处理
  requestOpts.isShowLoading && showLoading({
    title: requestOptsTips.loading
  });
  //uni.request ,context看需要执行
  return new Promise((resolve, reject) => {
    //获取当前的pageID
    const currentPageID = pageID.getCurrentID();
    const { rawUrl, method } = requestOpts;

    let route;
    let blueMpMock;
    //只有开发环境存在mock interceptor
    if (process.env.NODE_ENV !== 'production') {
      //项目模拟数据
      blueMpMock = require('@mock');
      //查找模拟拦截器中定义的路由
      route = blueMpMock.findRoute({
        url: rawUrl,
        method
      });
    }

    //模拟数据
    if (process.env.NODE_ENV !== 'production' && route) {
      const res = blueMpMock.response(route);
      //拦截器
      responseInterceptor({
        res,
        resolve,
        reject,
        requestOpts
      });
      //关闭油站
      requestOpts.isShowLoading && hideLoading();
    } else {
      //从设置的配置中扩展
      uni.request(utils.extend(requestOpts, {
        success: (res) => {
          //关闭loading
          requestOpts.isShowLoading && hideLoading();
          //比对当前的页面id，不匹配则不处理
          if (!pageID.isCurrentID(currentPageID)) return;
          //拦截器
          responseInterceptor({
            res,
            resolve,
            reject,
            requestOpts
          });
        },
        fail: (err) => {
          //关闭loading
          requestOpts.isShowLoading && hideLoading();
          //比对当前pageID
          if (!pageID.isCurrentID(currentPageID)) return;
          //选取提醒信息
          let msg = requestOptsTips.fail;
          //超时提醒
          if (err && /timeout/.test(err.errMsg)) {
            msg = requestOptsTips.timeout;
          }
          showToast({
            title: msg
          });
          reject(err);
        }
      }));
    }
  });
};
