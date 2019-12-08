import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理

//拦截处理
export function requestInterceptor(opts) {
  const { res, resolve, reject } = opts;
  //http code 处理
  if (res.statusCode === 200) {
    const { code: requestCode, status } = res.data;
    //业务code处理
    if (requestCode === code.SUCCESS || status === true) {
      resolve.call(this, res.data);
    } else {
      //错误码处理
      codeHandler({
        code: requestCode
      });
      reject(res.data);
    }
  } else {
    reject(res.data);
  }
}
