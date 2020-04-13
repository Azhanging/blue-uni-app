import config from '@config';
import $request from '$request';
import utils from 'blue-utils';

export function apiLogin ( opts: any = {} ) {
	const login = config.login;
	const loginRequest = login.request;
	const { params, url } = opts;
	return $request({
		url: url || utils.hook(null, loginRequest.url) || '',
		method: loginRequest.method,
		baseUrl: loginRequest.baseUrl,
		data: params,
		tips: {
			loading: '登录中',
			timeout: '登录超时'
		}
	});
}
