import utils from 'blue-utils';     //公共工具
import config from '@config';       //项目config
import { mpInVue } from '$mp-api';    //wechat api in vue

export default function useInVue ( Vue: any ): void {
	//wx api in vue
	mpInVue(Vue);
	//blue-utils in vue
	Vue.prototype.$utils = utils;
	//扩展config
	Vue.mixin({
		data () {
			return {
				config,
				platform: process.env.UNI_PLATFORM
			};
		}
	});
}