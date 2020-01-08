import config from '@config';
import $request from '$request';

export function apiGetUserInfo(params) {
  const { request: userInfoRequest } = config.userInfo;
  return $request({
    url: userInfoRequest.url,
    baseUrl: userInfoRequest.baseUrl,
    data: params,
    isShowLoading: false
  }).then((res) => {
    const { data } = res;
    if (!data) {
      //在平台获取不到数据流，不进行用户设置
      return Promise.reject('用户为注册，暂无用户信息');
    }
    return res;
  });
}