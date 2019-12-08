import $request from '$request';

//错误处理 上报
export function apiErrorReport(err) {
  return $request({
    url: '',
    baseUrl: '',
    method: 'POST',
    data: {
      error: err
    }
  });
}