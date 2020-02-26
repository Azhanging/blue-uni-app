import code from './code';
import { redirectRegister } from '$mp-api/register';
import { getCurrentPath } from "$mp-api/page";
import { login, clearLoginStatus } from '$mp-api/login';
import { showToast } from '$mp-api/toast';
import { navigateToReLogin } from '$mp-api/login';

//错误码处理
export function codeHandler(opts = {}) {
  const {
    code: requestCode,
    message,
    reject,
    res
  } = opts;
  switch (requestCode) {
    case code.REGISTER:
      //没有注册绑定手机
      return redirectRegister({
        path: getCurrentPath()
      });
    case code.EXPIRE_LOGIN:
      clearLoginStatus();
      return navigateToReLogin({
        path: getCurrentPath()
      });
    case code.MESSAGE:
      //提醒信息
      message && showToast({
        title: message
      });
      break;
  }
  reject(res.data);
}



