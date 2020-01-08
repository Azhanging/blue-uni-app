import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理
import { login } from '$mp-api/login';
import { showToast } from '$mp-api/toast';

//拦截处理
export function responseInterceptor(opts) {
  const { res, resolve, reject, requestOpts } = opts;
  //http code 处理
  if (res.statusCode === 200) {
    const { code: requestCode } = res.data;
    //业务code处理
    if (requestCode === code.SUCCESS) {
      resolve.call(this, res.data);
    } else {
      //错误码处理
      codeHandler({
        code: requestCode,
        requestOpts,
        resolve,
        reject,
        res
      });
    }
  } else if (res.statusCode === 404) {
    showToast({
      title: '服务异常',
      icon: 'none'
    });
  } else if (res.statusCode === 401) {
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
