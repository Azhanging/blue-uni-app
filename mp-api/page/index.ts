import config from '@config';
import store from '@store';
import utils from 'blue-utils';
import PageID from './page-id';
import { blackListFilter } from '$assets/js/black-list';

//页面参数
export let query: any = {};

//实例化页面id
export const pageID: PageID = new PageID();

//扩展onShow设置新的page id
export function pageInVue ( Vue: any ): void {
	Vue.mixin({
		onShow () {
			pageID.setCurrentID();
		}
	});
}

//设置参数
export function setQuery ( pageQuery: any ): void {
	query = pageQuery || {};
}

//获取最后一个地址链接
export function getCurrentPath (): string {
	const lastPage: any = getCurrentPage();
	if (lastPage) {
		//获取到参数
		const query: any = utils.stringifyParams(lastPage.options || {});
		//微信的getCurrentPages方法的route地址首位不带/
		return `/${lastPage.route}${query ? `?${query}` : ''}`;
	}
	return config.path.home;
}

//获取当前的page实例
export function getCurrentPage (): any {
	const currentPage: any[] = getCurrentPages();
	return currentPage[ currentPage.length - 1 ];
}

//设置最后一个路由地址
export function setLastPath ( path: string = '' ): void {
	//设置最后的路由，过滤掉地址信息
	store.commit('SET_LAST_PATH', blackListFilter({
		path,
		blackList: config.pages.lastPathBlackList
	}));
}

//回到设置的最后一个路由上
export function backLastRoute ( opts: {
	type?: string;
} = {} ): void {
	const { type } = opts;
	const url = store.state.lastPath;
	switch (type) {
		case 'launch':
			return uni.reLaunch({
				url
			});
		case 'tab':
			return uni.switchTab({
				url
			});
		case 'redirect':
			return uni.redirectTo({
				url
			});
		case 'nav':
		default :
			uni.navigateTo({
				url
			});
	}
}