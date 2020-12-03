import config from '@config';
import utils from 'blue-utils';

const defaultConfig = {
	confirmColor: config.css.baseColor,
	showCancel: false
};

export function showModal ( opts: any ): Promise<any> {
	return new Promise(( resolve, reject ) => {
		uni.showModal(utils.extend(defaultConfig, opts, {
			success: ( res: any ) => {
				if (res.cancel) {
					reject(res);
				} else {
					resolve(res)
				}
			},
			fail: ( err: any ) => reject(err)
		}));
	});
}

export function modalInVue ( Vue: any ): void {
	Vue.prototype.$showModal = showModal;
}
