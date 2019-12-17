import config from '@config';
import { checkLocalLogin } from '$mp-api/login';

const state = {

  //登录状态
  login: (() => {
    return checkLocalLogin();
  })(),

  //用户授权信息，userInfo.phone来判定是否存在手机号
  userInfo: {
    status: true
  },

  //GPS定位信息相关
  location: {
    lat: null,
    lgt: null
  },

  //业务回退url，默认主页url
  lastPath: config.path.home

};

export default state;
