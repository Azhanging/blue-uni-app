import { Base64 } from 'js-base64';   //base64
import utils from 'blue-utils';     //公共工具
import { mpInVue } from '../mp-api';    //wechat api in vue
import config from '@config';       //项目config

export default function useInVue(Vue) {

	//wx api in vue
	mpInVue(Vue);

	//blue-utils in vue
	Vue.prototype.$utils = utils;

	//扩展config
	Vue.mixin({
		data() {
			return {
				config,
				platform: process.env.UNI_PLATFORM
			};
		}
	});

	//base64
	Vue.prototype.$base64 = Base64;

}