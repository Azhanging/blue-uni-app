import { userInfoInVue } from './user-info';
import { requestInVue } from './request';
import { locationInVue } from './location';
import { mpPayInVue } from './pay';
import { phoneInVue } from './phone';
import { imageInVue } from './image';
import { modalInVue } from './modal';
import { loginTaskInVue } from './login/task';
import { mpUpdate } from './update';
import { onLoadInVue } from './on-load';
import { shareInVue } from './share';
import { scanCodeInVue } from "./scan-code";
import { animationInVue } from "./animation";
import { uploadInVue } from './upload';
import { invoiceInVue } from './invoice';
import * as mp from './compatible';

export function weChatInVue(Vue) {

  //检查更新小程序版本
  mpUpdate();

  //设置分享
  shareInVue(Vue);

  //扩展userInfo in Vue
  userInfoInVue(Vue);

  //扩展 wx.request,带上session_key处理
  requestInVue(Vue);

  //扩展 wx.getLocation
  locationInVue(Vue);

  //扩展支付 wx.requestPayment
  mpPayInVue(Vue);

  //扩展获取手机号
  phoneInVue(Vue);

  //图片相关
  imageInVue(Vue);

  //提示相关
  modalInVue(Vue);

  //on load mixin
  onLoadInVue(Vue);

  //扫一扫
  scanCodeInVue(Vue);

  //动画相关
  animationInVue(Vue);

  //任务队列，针对登录的任务队列
  loginTaskInVue(Vue);

  //上传相关
  uploadInVue(Vue);

  //发票
  invoiceInVue(Vue);

  //扩展兼容api
  Vue.prototype.$$mp = mp;
}

export default weChatInVue;


