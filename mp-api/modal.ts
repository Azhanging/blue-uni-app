import config from '@config';
import utils from 'blue-utils';

const defaultConfig = {
	confirmColor: config.css.baseColor,
	showCancel: false
};

export function showModal ( opts: any ): Promise<any> {
	return uni.showModal(utils.extend(defaultConfig, opts)).then(([err: any, res: any]) => {
	    if (err) return Promise.reject(err);
	    if (res.cancel) return Promise.reject(res);
	    return res;
	});
}

export function modalInVue ( Vue: any ): void {
	Vue.prototype.$showModal = showModal;
}
