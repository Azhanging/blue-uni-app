import config from '@config';
import $request from '$request';
import utils from 'blue-utils';

export function apiLogin ( opts: any = {} ): Promise<any> {
	const login = config.login;
	const loginRequest = login.request;
	const {data, url} = opts;
	return $request({
		url: url || utils.hook(null, loginRequest.url) || '',
		method: loginRequest.method,
		baseUrl: loginRequest.baseUrl,
		data,
		tips: {
			loading: '登录中',
			timeout: '登录超时'
		}
	});
}
