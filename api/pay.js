import $request from '$request';
import config from '@config';

//支付api
export function apiPay(params) {
  return $request({
    url: config.pay.url,
    baseUrl: config.pay.baseUrl,
    method: 'POST',
    data: params
  });
}
