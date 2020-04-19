import utils from 'blue-utils';

//默认的toast属性
const defaultToastOpts = {
	mask: true
};

//获取不同类型的icon
function getIcon ( type: string ): string {
	let icon = '';
	switch (type) {
		case 'success':
			icon = ``;
			break;
		case 'warn':
			icon = ``;
			break;
		case 'error':
			icon = ``;
			break;
		default :
			icon = 'none';
	}
	return icon;
}

//显示不同的弹窗
export function showToast ( opts: any ): Promise<any> {
	const {type} = opts;
	return new Promise(( resolve, reject ) => {
		uni.showToast(utils.extend({
				icon: getIcon(type),
			}, defaultToastOpts, opts, {
				success ( res: any ) {
					resolve(res);
				},
				fail ( err: any ) {
					reject(err);
				}
			}
		));
	});
}

//在vue中扩展
export function toastInVue ( Vue: any ) {
	Vue.prototype.$showToast = showToast;
}

