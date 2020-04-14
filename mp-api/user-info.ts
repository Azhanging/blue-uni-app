import store from "@store";
import { apiGetUserInfo } from '$api';
import config from '@config';
import utils from 'blue-utils';

//获取用户信息
export function getUserInfo (): void {
	apiGetUserInfo().then(( res: any ) => {
		const {data} = res;
		//设置用户信息
		setUserInfo(data);
	});
}

//设置用户信息
export function setUserInfo ( data: any ): void {
	//config中userInfo
	const configUserInfo = config.userInfo;
	//设置info信息
	store.commit('SET_USER_INFO', utils.hook(null, configUserInfo.hooks.got, [data]));
	//设置登录状态
	store.commit('SET_LOGIN', true);
}










