import utils from 'blue-utils';

//扫二维码
function scanCode ( opts: any = {} ): Promise<any> {
	return new Promise(( resolve, reject ) => {
		uni.scanCode(utils.extend({
			success: ( res: any ) => {
				//统一微信||支付宝区分扫描到data中
				res.data = res.result || res.code || ``;
				resolve(res);
			},
			fail: ( err: any ) => {
				//取消，失败
				reject(err);
			}
		}, opts));
	});
}

//在vue扩展
export function scanCodeInVue ( Vue: any ): void {
	Vue.prototype.$scanCode = scanCode;
}