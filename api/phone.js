import $request from '$request';
import config from '@config';

export function aipGetPhone(params) {
  return $request({
    url: config.phone.url,
    baseUrl: config.phone.baseUrl,
    data: params
  });
}