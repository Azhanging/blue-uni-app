import code from './code';
import { redirectRegister } from '$mp-api/register';
import { getCurrentPath } from "$mp-api/page";
import { login, clearLoginStatus } from '$mp-api/login';
import * as mp from '$mp-api/compatible';

//错误码处理
export function codeHandler(opts = {}) {
  const {
    code: requestCode,
    message,
    requestOpts
  } = opts;
  switch (requestCode) {
    case code.REGISTER:
      //没有注册绑定手机
      redirectRegister({
        path: getCurrentPath()
      });
      break;
    case code.UN_LOGIN:
      //没登录或者鉴权失效
      //清空所有的存储
      clearLoginStatus();
      //重新登录
      login({
        requestOpts
      });
      break;
    case code.MESSAGE:
      //提醒信息
      message && mp.showToast({
        title: message
      });
  }
}



