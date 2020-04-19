import $request from '$request';

//错误处理 上报
export function apiErrorReport(err: any): Promise<any> {
	return $request({
		url: '',
		baseUrl: '',
		method: 'POST',
		data: {
			error: err,
			systemInfo: uni.getSystemInfoSync()
		},
		showLoading: false,
		checkPageID: false
	});
}