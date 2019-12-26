import { requestInVue } from './request';
import { loginInVue } from './login';
import { locationInVue } from './location';
import { imageInVue } from './image';
import { modalInVue } from './modal';
import { loginTaskInVue } from './login/task';
import { mpUpdate } from './update';
import { shareInVue } from './share';
import { scanCodeInVue } from "./scan-code";
import { animationInVue } from "./animation";
import { uploadInVue } from './upload';
import { invoiceInVue } from './invoice';
import { toastInVue } from './toast';
import { loadingInVue } from './loading';

export function weChatInVue(Vue) {
  //检查更新小程序版本
  mpUpdate();
  //登录相关
  loginInVue(Vue);
  //设置分享
  shareInVue(Vue);
  //扩展 wx.request,带上session_key处理
  requestInVue(Vue);
  //扩展 wx.getLocation
  locationInVue(Vue);
  //图片相关
  imageInVue(Vue);
  //提示相关
  modalInVue(Vue);
  //弹窗相关
  toastInVue(Vue);
  //loading相关
  loadingInVue(Vue);
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
}

export default weChatInVue;


