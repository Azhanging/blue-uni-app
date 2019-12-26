import utils from 'blue-utils';
import config from '@config';
import { showLoading, hideLoading } from '$mp-api/loading';

//拦截处理
import { requestInterceptor } from './interceptor';

//请求的提醒信息
const requireTips = {
  loading: '数据加载中',
  fail: '连接错误',
  timeout: `请求超时`
};

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

  const requestConfig = {
    data: "",
    method: "GET",
    dataType: "json",
    responseType: "text",
    isShowLoading: true,
    header: utils.extend({
      ['content-type']: 'application/x-www-form-urlencoded'
    }, setRequestHeader())
  };
  return utils.extend(requestConfig, opts);
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
  let _requestOpts = setExtend(requestOpts);

  //request loading的处理
  _requestOpts.isShowLoading && showLoading({
    title: requireTips.loading,
    mask: true
  });

  //uni.request ,context看需要执行
  return new Promise((resolve, reject) => {
    const { rawUrl, method } = _requestOpts;
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
      requestInterceptor({
        res,
        resolve,
        reject,
        requestOpts
      });
      //关闭油站
      _requestOpts.isShowLoading && hideLoading();
    } else {
      //从设置的配置中扩展
      uni.request(utils.extend(_requestOpts, {
        success: (res) => {
          //拦截器
          requestInterceptor({
            res,
            resolve,
            reject,
            requestOpts
          });
          //关闭loading
          _requestOpts.isShowLoading && hideLoading();
        },
        fail: (err) => {
          let msg = requireTips.fail;
          //超时提醒
          if (err && /timeout/.test(err.errMsg)) {
            msg = requireTips.timeout;
          }
          uni.showToast({
            title: msg,
            icon: 'none'
          });
          _requestOpts.isShowLoading && hideLoading();
          reject(err);
        }
      }));
    }
  });
};
