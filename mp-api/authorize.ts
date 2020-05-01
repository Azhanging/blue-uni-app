import { showModal } from "./modal";
import utils from 'blue-utils';
import { getSetting } from "$mp-api/setting";

//授权信息检查
export function authorize ( opts: {
	scope: string;
} ): Promise<any> {
	const { scope } = opts;
	return new Promise(( resolve, reject ) => {
		//微信检查授权
		if (process.env.VUE_APP_PLATFORM === 'mp-weixin') {
			//检订阅消息通知权限
			if (scope === 'subscribeMessage') {
				getSetting().then(( res ) => {
					const { subscriptionsSetting } = res;
					if (!subscriptionsSetting) {
						reject();
					} else {
						const { mainSwitch } = subscriptionsSetting;
						mainSwitch ? resolve() : reject();
					}
				});
			} else {
				//其他权限
				uni.authorize({
					scope: opts.scope,
					success: ( res: any ) => {
						if (/ok/.test(res.errMsg)) {
							resolve();
						} else {
							reject(res);
						}
					},
					fail: ( e: any ) => {
						reject(e);
					}
				});
			}
		} else {
			//支付宝类不需要检查权限，使用检查权限
			resolve();
		}
	});
}

//授权失败
export function authorizeFail ( opts: {
	type: string;
	openSetting?: boolean;
} ): void {
	const { type, openSetting } = opts;
	const typeName = (() => {
		switch (type) {
			case `userInfo`:
				return `用户`;
			case `location`:
				return `定位`;
			case `invoiceTitle`:
				return `发票抬头`;
			case `writePhotosAlbum`:
				return `保存图片`;
			case `subscribeMessage`:
				return `订阅消息`;
			default :
				return '部分';
		}
	})();

	//授权失败提示，可以跳转授权设置
	showModal(utils.extend({
		title: `授权失败，${typeName}功能无法使用`,
		confirmText: '前往设置',
		showCancel: true
	}, opts)).then(( res ) => {
		const { confirm } = res;
		//openSetting这里的显示设置可配置
		if (confirm === true && openSetting !== false) {
			//打开到设置的页面
			uni.openSetting();
		}
	});
}
