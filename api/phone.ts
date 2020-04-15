import $request from '$request';
import config from '@config';

export function aipGetPhone ( params: any ): Promise<any> {
	return $request({
		url: config.phone.url,
		baseUrl: config.phone.baseUrl,
		data: params
	});
}