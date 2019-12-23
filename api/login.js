import $request from '$request';
import config from '@config';
import utils from 'blue-utils';

export function apiLogin(params) {
  const login = config.login;
  return $request({
    url: utils.hook(null, login.url) || login.url || '',
    method: 'post',
    baseUrl: login.baseUrl,
    data: params,
    isShowLoading: false
  });
}
