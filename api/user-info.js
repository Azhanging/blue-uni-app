import $request from '$request';
import config from '@config';

export function apiUpdateUserInfo(params) {
  const userInfo = config.userInfo;
  return $request({
    url: userInfo.url,
    baseUrl: userInfo.baseUrl,
    data: params,
    isShowLoading: false
  });
}