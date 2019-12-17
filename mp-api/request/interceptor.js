import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理

//拦截处理
export function requestInterceptor(opts) {
  const { res, resolve, reject, requestOpts } = opts;
  //http code 处理
  if (res.statusCode === 200) {
    const { code: requestCode, status } = res.data;
    //业务code处理
    if (requestCode === code.SUCCESS || status === true) {
      resolve.call(this, res.data);
    } else {
      //错误码处理
      codeHandler({
        code: requestCode,
        requestOpts
      });
      reject(res.data);
    }
  } else if (res.statusCode === 401) {
    //没有权限，登录失效
    const { login, clearLoginStatus } = require('$mp-api/login');
    //清空所有的存储
    clearLoginStatus();
    //重新登录
    login({
      requestOpts
    }).then((res) => {
      resolve(res);
    });
  } else {
    reject(res.data);
  }
}
