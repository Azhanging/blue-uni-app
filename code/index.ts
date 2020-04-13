import code from './code';
import { redirectRegister } from '$mp-api/register';
import { getCurrentPath } from "$mp-api/page";
import { clearLoginStatus } from '$mp-api/login';
import { showToast } from '$mp-api/toast';
import { navigateToReLogin } from '$mp-api/login';

//code处理选项
interface TCodeHandlerOpts {
	code: number;
	message?: string;
	reject: Function;
	res: any;
}

//错误码处理
export function codeHandler ( opts: TCodeHandlerOpts ) {
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



