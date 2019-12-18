import $request from '$request';
import config from '@config';

export function apiGetUserInfo(params) {
  const userInfo = config.userInfo;
  return $request({
    url: userInfo.url,
    baseUrl: userInfo.baseUrl,
    data: params,
    isShowLoading: false
  }).then((res) => {
    const { data } = res;
    if (!data) {
      //在平台获取不到数据流，不进行用户设置
      return Promise.reject('member not register');
    }
    return res;
  });
}